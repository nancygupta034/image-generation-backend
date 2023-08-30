import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
// import OpenAI from 'openai';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

router.route('/').get((req, res) => {
    res.send('Hello from openai');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        // const aiResponse = await openai.image.create({
        //     prompt,
        //     n: 1,
        //     size: '1024x1024',
        //     response_format: 'b64_json',
        // })

        // const image = aiResponse.data.data[0].b64_json;
        // res.status(200).json({ photo: image });
        const url = 'https://api.openai.com/v1/images/generations';
        const headers = {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
        };
        const data = {
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        }
       const generatedImage = await axios.post(url, data, { headers });
       const image = generatedImage.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
});



export default router;