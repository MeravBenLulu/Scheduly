import express,{ Router } from "express"; 
import businessApiFunctions from '../controllers/businessController';  // ייבוא הקונטרולר

const app :Router=express.Router();

async function routers():Promise<void>{
    app.get('/business/:email',businessApiFunctions.getByEmail);
    app.get('/business',businessApiFunctions.get );
    app.post('/business',businessApiFunctions.post);
    app.put('/business/:email',businessApiFunctions.put);
    app.delete('/business/:email',businessApiFunctions.delete);
}
routers();

export default app;