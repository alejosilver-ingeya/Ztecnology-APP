import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/users.routes';
import citiesRoutes from '../routes/citie.routes';
import customerRoutes from '../routes/customers.routes';
import productRoutes from '../routes/products.routes';
import quoteRoutes from '../routes/quotes.routes';
import stateQuoteRoutes from '../routes/stateQuote.routes';

dotenv.config();

class Server {

    private app: Application
    private port: string | undefined;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/usuarios',
        citie: '/api/ciudades',
        customers: '/api/clientes',
        products: '/api/productos',
        quotes: '/api/cotizaciones',
        quoteDetail: '/api/detalle-cotizacion',
        stateQuote: '/api/estado-cotizacion'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes),
            this.app.use(this.apiPaths.user, userRoutes),
            this.app.use(this.apiPaths.citie, citiesRoutes),
            this.app.use(this.apiPaths.customers, customerRoutes),
            this.app.use(this.apiPaths.products, productRoutes),
            this.app.use(this.apiPaths.quotes, quoteRoutes),
            this.app.use(this.apiPaths.stateQuote, stateQuoteRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando en el puerto: ${this.port}`);
        })
    }
}

export default Server;