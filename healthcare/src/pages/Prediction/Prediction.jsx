import React, { useState, useEffect } from "react";
import "./Prediction.css";
import Button from "../../components/ui/Button";
import OpenAI from 'openai';

function Prediction() {

    const openAi = new OpenAI({
        apiKey: "",
        dangerouslyAllowBrowser: true
    });
    const values = 'headache,fever,stomachpain,cold,cough';
    const [response, setResponse] = useState({});
    
    const loadPredictor = async () => {

        let symptoms = values.split(',');
        const messageContent = `I am suffering with ${symptoms.join(',')}
                                now suggest me the precautions, the doctor specialization to consult  and the name of the disease
                                give the answer in JSON format`;
        try {
            const result = await openAi.chat.completions.create({
                model: "gpt-3.5-turbo-16k-0613",
                messages: [
                    {
                        role: "user",
                        content: messageContent
                    },
                ],
            });

            setResponse(JSON.parse(result.choices[0].message.content))
        } catch (error) {
            console.error("Error:", error);
        }

    };

    useEffect(() => {
        // Call loadPredictor inside useEffect
        loadPredictor();
    }, []); // Ensure to include an empty dependency array if loadPredictor doesn't depend on any variables

    const handleOnClick = () => { };

    return (
        <>
            <div className="predictor-outer-container">
                <div className="predictor-inner-container">
                    <div className="predicted-disease">
                        <div className="predicted-disease-name">Disease name</div>
                        <div className="predicted-disease-description">{response.disease_name}</div>
                    </div>
                    <div className="predicted-disease">
                        <div className="predicted-disease-name">Precautions</div>
                        <div className="predicted-disease-description">{response.precautions}</div>
                    </div>
                    <div className="predicted-disease">
                        <div className="predicted-disease-name">Doctors to consult</div>
                        <div className="predicted-disease-description">{response.doctor_specialization}</div>
                    </div>
                </div>
                <div className="button-group">
                    <Button
                        label="Find Doctors"
                        buttonType="primary"
                        handleFunction={handleOnClick}
                    />
                    <Button
                        label="Book Appointment"
                        buttonType="primary"
                        handleFunction={handleOnClick}
                    />
                </div>
            </div>
        </>
    );
}

export default Prediction;
