'use client';
import { useState } from 'react';
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import { HaloCommandObject } from '@arx-research/libhalo/types';

export const NFCSigner = () => {
    const [status, setStatus] = useState('Ready to scan');
    const [result, setResult] = useState<string | null>(null);
    const [isReading, setIsReading] = useState(false);
    const [signature, setSignature] = useState(null);

    let command:HaloCommandObject = {
        name: "sign",
        keyNo: 1, // Assuming key slot 1 EOA
        message: "010203" // message to sign
    };

    const readNFC = async () => {
        try {
            let result = await execHaloCmdWeb(command, {
                statusCallback: (cause) => {
                    if (cause === "init") {
                        setStatus("Please tap the tag to the back of your smartphone and hold it...");
                    } else if (cause === "retry") {
                        setStatus("Something went wrong, please try to tap the tag again...");
                    } else if (cause === "scanned") {
                        setStatus("Tag scanned successfully, post-processing the result...");
                    } else {
                        setStatus(cause);
                    }
                }
            });

            console.log("NFC read result: ", result);
            let stringify = JSON.stringify(result, null, 4);
            setResult(stringify);

        } catch (error) {
            console.error("Error reading NFC:", error);
            setStatus('Error reading NFC');
        }
    };
    
    return (
        <Button
          onClick={readNFC}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Scan wristband
        </Button>
    );
}