import express from 'express';
import { createConnection } from 'mysql2';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

var conn = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'Green_Pulse_India'
})

conn.connect((error) => {
    if (error) {
        console.log("Error in Database Connection", error);
    }
    else {
        console.log("Database Connected Successfully");
    }
})

var app = express();
app.use(express.json());
app.use(cors());

//Middleware
function verifyToken(request, response, next) {
    const authHead = request.get('Authorization');
    if (authHead) {
        const token = authHead.split(" ")[1];
        jwt.verify(token, "earth", (error, payload) => {
            if (error) {
                console.log("Wrong Token");
                response.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorize" });
            } else {
                next();
            }
        })

    }
    else {
        response.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized Personnel !!" });
    }
}

//Live_Event POST_API
app.post('/events', verifyToken, (req, res) => {
    const data = req.body;
    const qry = `insert into Live_Event values (${data.id},'${data.name}','${data.username}','${data.phone}','${data.event_name}','${data.address}' )`;
    conn.query(qry, (error, result) => {
        if (error) {
            if (error.errno === 1062) {
                console.log("Duplicate entry for id", data.id);
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Already Registered for the Event!" });
            }
            else {
                console.log("Error in inserting data", error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error in inserting data" });
            }
        }
        else {
            console.log("Data inserted successfully");
            res.status(StatusCodes.CREATED).json({ message: "Data inserted successfully" });
        }
    })
})

//LOGIN Profile fetching
app.post('/login', (request, response) => {
    try {
        console.log("Request Body - > ", request);
        const reqdata = request.body
        const qry = `select * from Volunteer where username = '${reqdata.username}'`;
        const qry2 = `select * from Past_Event where username = '${reqdata.username}'`;
        conn.query(qry, (error, result) => {
            if (error) {
                console.log("Error in fetching");
                response.status(StatusCodes.CONFLICT).send({ message: "Error in fetching data" });
            }
            else {
                if (result.length == 0) {
                    console.log("No Passoword found");
                    response.status(StatusCodes.NOT_FOUND).send({ message: "No Password found" });
                }
                else {
                    if (compareSync(reqdata.password, result[0].password)) {
                        const token = jwt.sign({ adminId: result[0].id }, "earth");

                        response.status(StatusCodes.OK).send({ message: "Login Successfull", token: token });
                        console.log("Token : ", token);

                    }
                    else {
                        console.log("Invalid Password");
                        response.status(401).send({ message: "Invalid Password" });
                    }
                }
            }

        })

    }
    catch (error) {
        response.status(StatusCodes.BAD_REQUEST).send({ message: "Internal Error" });
    }
})



//SIGN_UP POST_API
app.post('/signup', (request, response) => {
    try {
        const data = request.body; //String
        const encryptedPass = hashSync(data.password, 10);
        data.password = "";
        const qry = `insert into Volunteer(name, username, phone, address, password) values ('${data.name}','${data.username}','${data.phone}','${data.address}','${encryptedPass}')`;
        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                if (error.errno == 1062) {
                    console.log("Duplicate value");
                    response.status(StatusCodes.BAD_REQUEST).send({ message: "User Already Exists!" });
                }
                else {
                    response.status(StatusCodes.PRECONDITION_FAILED).send({ message: "Query failed" });
                }
            }
            else {
                console.log(`'${data.name}','${data.username}'`);
                response.status(StatusCodes.OK).send({ message: "Insertion Successfull" });
            }
        })
    }
    catch (error) {
        response.status(StatusCodes.BAD_REQUEST).send({ message: "Input is wrong" });
    }


})


//GET - PROFILE
// GET PROFILE (compatible version)
app.get('/profile/:a', verifyToken, (request, response) => {
    try {
        const id = parseInt(request.params.a);
        
        // First get the user's basic information
        const userQuery = `
            SELECT 
                id as volunteer_id,
                name,
                username as volunteer_username,
                phone,
                address
            FROM Volunteer 
            WHERE id = ?
        `;
        
        conn.query(userQuery, [id], (userError, userResult) => {
            if (userError) {
                console.error("Error fetching user:", userError);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                    message: "Error fetching user data" 
                });
            }

            if (userResult.length === 0) {
                return response.status(StatusCodes.NOT_FOUND).json({ 
                    message: "User not found" 
                });
            }

            const userData = userResult[0];
            
            // Then get the user's past events
            const eventsQuery = `
                SELECT events_name
                FROM Past_Event
                WHERE username = ?
            `;
            
            conn.query(eventsQuery, [userData.volunteer_username], (eventsError, eventsResult) => {
                if (eventsError) {
                    console.error("Error fetching events:", eventsError);
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                        message: "Error fetching events data" 
                    });
                }

                // Format the response to match what your frontend expects
                const formattedResponse = [
                    {
                        ...userData,
                        events_name: eventsResult.length > 0 ? eventsResult[0].events_name : null
                    },
                    ...eventsResult.slice(1).map(event => ({
                        volunteer_id: userData.volunteer_id,
                        name: userData.name,
                        volunteer_username: userData.volunteer_username,
                        phone: userData.phone,
                        address: userData.address,
                        events_name: event.events_name
                    }))
                ];

                response.status(StatusCodes.OK).json({ 
                    message: "Data fetched successfully", 
                    data: formattedResponse 
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal Server Error" 
        });
    }
});


//DELETE OF PROFILE
app.delete('/profile/:a', verifyToken, (request, response) => {
    try {
        const id = parseInt(request.params.a);
        const qry = `DELETE FROM Volunteer WHERE id = ?`;
        conn.query(qry, [id], (error, result) => {
            if (error) {
                console.log("Error in deleting");
                response.status(StatusCodes.CONFLICT).send({ message: "Error in deleting data" });
            } else {
                console.log("Data deleted successfully");
                response.status(StatusCodes.OK).send({ message: "Data deleted successfully" });
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
    }
});


//SAMPLE Input POST FOR PAST_EVENTS
app.post('/past_events', (req, res) => {
    const data = req.body;
    const qry = `insert into Past_Event (id,username,events_name) values (${data.id},'${data.username}','${data.events_name}')`;
    conn.query(qry, (error, result) => {
        if (error) {

            console.log("Error in inserting data", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error in inserting data" });

        }
        else {
            console.log("Data inserted successfully");
            res.status(StatusCodes.CREATED).json({ message: "Data inserted successfully" });
        }
    })
})

//UPDATE of Profile
app.put('/profile/:id', verifyToken, (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { name, phone, address } = request.body;

        // Basic validation
        if (!name && !phone && !address) {
            return response.status(StatusCodes.BAD_REQUEST).send({
                message: "At least one field (name, phone, or address) must be provided"
            });
        }

        // Validate phone format if provided
        if (phone && !/^[0-9]{10}$/.test(phone)) {
            return response.status(StatusCodes.BAD_REQUEST).send({
                message: "Phone must be exactly 10 digits"
            });
        }

        // Validate name length if provided
        if (name && (name.length < 3 || name.length > 30)) {
            return response.status(StatusCodes.BAD_REQUEST).send({
                message: "Name must be between 3 and 30 characters"
            });
        }

        // Validate address length if provided
        if (address && address.length > 100) {
            return response.status(StatusCodes.BAD_REQUEST).send({
                message: "Address cannot exceed 100 characters"
            });
        }

        // Check if volunteer exists
        const checkQry = 'SELECT id FROM Volunteer WHERE id = ?';
        conn.query(checkQry, [id], (checkError, checkResult) => {
            if (checkError) {
                console.error("Database error checking volunteer:", checkError);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    message: "Error checking volunteer"
                });
            }

            if (checkResult.length === 0) {
                return response.status(StatusCodes.NOT_FOUND).send({
                    message: "Volunteer not found"
                });
            }

            // Build the update query
            const updateFields = [];
            const updateValues = [];

            if (name) {
                updateFields.push('name = ?');
                updateValues.push(name);
            }
            if (phone) {
                updateFields.push('phone = ?');
                updateValues.push(phone);
            }
            if (address) {
                updateFields.push('address = ?');
                updateValues.push(address);
            }

            updateValues.push(id); // Add ID for WHERE clause

            const updateQry = `
                UPDATE Volunteer 
                SET ${updateFields.join(', ')} 
                WHERE id = ?
            `;

            conn.query(updateQry, updateValues, (updateError, updateResult) => {
                if (updateError) {
                    console.error("Database update error:", updateError);
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                        message: "Error updating profile"
                    });
                }

                response.status(StatusCodes.OK).send({
                    message: "Profile updated successfully",
                    updatedFields: {
                        ...(name && { name }),
                        ...(phone && { phone }),
                        ...(address && { address })
                    }
                });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error"
        });
    }
});

//POST CONTACT Form
app.post('/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const qry = `INSERT INTO contact (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`;
    
    conn.query(qry, [name, email, phone, subject, message], (error, result) => {
        if (error) {
            console.log("Error in inserting data", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                message: "Error in sending message",
                error: error.message // Send the actual error message to help debugging
            });
        }
        else {
            console.log("Data inserted successfully");
            res.status(StatusCodes.CREATED).json({ message: "Message sent successfully" });
        }
    });
});

app.get('/live-events/:userId', verifyToken, (request, response) => {
    try {
        const userId = parseInt(request.params.userId);
        
        // First get the username from Volunteer table
        const getUsernameQuery = 'SELECT username FROM Volunteer WHERE id = ?';
        
        conn.query(getUsernameQuery, [userId], (usernameError, usernameResult) => {
            if (usernameError) {
                console.error("Error fetching username:", usernameError);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                    message: "Error fetching user information" 
                });
            }

            if (usernameResult.length === 0) {
                return response.status(StatusCodes.NOT_FOUND).json({ 
                    message: "User not found" 
                });
            }

            const username = usernameResult[0].username;
            
            // Then get all live events for this username
            const getEventsQuery = `
                SELECT 
                    id,
                    event_name as name,
                    address,
                    phone,
                    created_at as registration_date
                FROM Live_Event 
                WHERE username = ?
                ORDER BY created_at DESC
            `;
            
            conn.query(getEventsQuery, [username], (eventsError, eventsResult) => {
                if (eventsError) {
                    console.error("Error fetching live events:", eventsError);
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                        message: "Error fetching live events" 
                    });
                }

                response.status(StatusCodes.OK).json({
                    message: "Live events fetched successfully",
                    data: eventsResult.map(event => ({
                        ...event,
                        status: "registered"
                    }))
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error" 
        });
    }
});

app.delete('/live-events/:eventId', verifyToken, (request, response) => {
    try {
        const eventId = parseInt(request.params.eventId);
        const token = request.get('Authorization').split(' ')[1];
        const payload = jwt.verify(token, "earth");
        const userId = payload.adminId;

        // First verify the event belongs to this user
        const verifyQuery = `
            SELECT le.id 
            FROM Live_Event le
            JOIN Volunteer v ON le.username = v.username
            WHERE le.id = ? AND v.id = ?
        `;

        conn.query(verifyQuery, [eventId, userId], (verifyError, verifyResult) => {
            if (verifyError) {
                console.error("Verification error:", verifyError);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                    message: "Error verifying event ownership" 
                });
            }

            if (verifyResult.length === 0) {
                return response.status(StatusCodes.FORBIDDEN).json({ 
                    message: "Event not found or you don't have permission to cancel it" 
                });
            }

            // Delete the event registration
            const deleteQuery = 'DELETE FROM Live_Event WHERE id = ?';
            
            conn.query(deleteQuery, [eventId], (deleteError, deleteResult) => {
                if (deleteError) {
                    console.error("Deletion error:", deleteError);
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
                        message: "Error cancelling event registration" 
                    });
                }

                if (deleteResult.affectedRows === 0) {
                    return response.status(StatusCodes.NOT_FOUND).json({ 
                        message: "Event registration not found" 
                    });
                }

                response.status(StatusCodes.OK).json({ 
                    message: "Event registration cancelled successfully" 
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal server error" 
        });
    }
});

//TO DISPLAY COUNT
app.get('/VolunteerCount', (req, res) => {
    const qry = `SELECT COUNT(*) as count FROM Volunteer`;
    conn.query(qry, (error, result) => {
        if (error) {
            console.log("Error in fetching count", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error in fetching count" });
        }
        else {
            console.log("Count fetched successfully");
            res.status(StatusCodes.OK).json({ message: "Count fetched successfully", count: result[0].count });
        }
    });
});

// New Endpoint: Reset Password
app.post('/reset-password', (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(StatusCodes.BAD_REQUEST).json({ message: "Name, email, and password are required" });
        }

        // Validate password strength (optional, but recommended)
        if (password.length < 6) {
            return response.status(StatusCodes.BAD_REQUEST).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user exists with matching name and username (email)
        const checkQry = 'SELECT id FROM Volunteer WHERE name = ? AND username = ?';
        conn.query(checkQry, [name, email], (checkError, checkResult) => {
            if (checkError) {
                console.error("Error checking user:", checkError);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error checking user" });
            }

            if (checkResult.length === 0) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: "User not found with provided name and email" });
            }

            // Hash the provided password
            const encryptedPass = hashSync(password, 10);
            const updateQry = 'UPDATE Volunteer SET password = ? WHERE name = ? AND username = ?';
            conn.query(updateQry, [encryptedPass, name, email], (updateError, updateResult) => {
                if (updateError) {
                    console.error("Error updating password:", updateError);
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error resetting password" });
                }

                if (updateResult.affectedRows === 0) {
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to reset password" });
                }

                response.status(StatusCodes.OK).json({ message: "Password reset successfully" });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})