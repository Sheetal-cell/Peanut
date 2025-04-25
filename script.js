const pet = document.getElementById('pet');
const statusText = document.getElementById('statusText');
const startListeningButton = document.getElementById('startListening');

// Function to start listening to the user's voice in Hindi
function startListening() {
    // Check if the browser supports speech recognition
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'hi-IN'; // Set the language to Hindi (India)
        recognition.interimResults = false; // Don't show interim results
        recognition.maxAlternatives = 1; // Limit to the best result

        // When speech is detected, this function will trigger
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript; // Get the user's speech
            console.log('User said: ', transcript);
            speak(transcript); // Peanut repeats the speech in Hindi
            statusText.innerText = `You said: "${transcript}"`; // Display what the user said
        };

        // Handle errors in speech recognition
        recognition.onerror = function(event) {
            console.error('Speech recognition error: ', event.error);
            statusText.innerText = "Sorry, I couldn't understand that.";
        };

        // Start listening for the user's voice
        recognition.start();
        statusText.innerText = "Listening... Speak now!";
    } else {
        alert('Speech recognition is not supported in your browser.');
    }
}

// Function for Peanut to "talk" when clicked in Hindi
function talkToPeanut() {
    const message = "नमस्ते, मैं Peanut हूँ!"; // Default message in Hindi
    speak(message);
    statusText.innerText = `Peanut says: "${message}"`; // Show what Peanut says
}

// Function to make Peanut speak in Hindi
function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.volume = 1; // Volume level (0.0 to 1.0)
    speech.rate = 1; // Speed of speech (1 is normal)
    speech.pitch = 1; // Pitch of the voice (1 is normal)

    // Set voice to Hindi (India)
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN'); // Find Hindi voice
    if (hindiVoice) {
        speech.voice = hindiVoice;
    }

    window.speechSynthesis.speak(speech);
}

// Function to make the user speak and display it on screen in Hindi
function speakUserMessage() {
    const userMessage = document.getElementById('userInput').value; // Get user's input
    speak(userMessage); // Peanut repeats the user's input in Hindi
    statusText.innerText = `You said: "${userMessage}"`; // Display the user's input
}
