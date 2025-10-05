// --- Quiz Data: Rialo Bridging Scenarios ---

const QUIZ_QUESTIONS = [
    {
        question: "DILEMMA 1: Your dApp needs to fetch the *live USD price* of an asset to execute a trade. How do you implement this data feed efficiently?",
        choices: [
            "A) Use a decentralized **Oracle Network** (e.g., Chainlink) which requires token collateral and pays gas.",
            "B) Store the price statically on the blockchain and update it manually once per day.",
            "C) Use Rialo's **Native Web Calls** (built-in protocol) to securely fetch the data from a trusted API endpoint.",
            "D) Bridge the price data from a slow Ethereum sidechain."
        ],
        answer: "C) Use Rialo's **Native Web Calls** (built-in protocol) to securely fetch the data from a trusted API endpoint."
    },
    {
        question: "DILEMMA 2: You want a user to log in and access their wallet using their **email/social account**, avoiding seed phrases. Which feature is required?",
        choices: [
            "A) Force the user to use a hardware Ledger device for all logins.",
            "B) Implement a traditional Web3 wallet (e.g., MetaMask) requiring a 12-word recovery phrase.",
            "C) Leverage Rialo's **Native Identity and 2FA** support for familiar Web2-style authentication.",
            "D) Build a complex Layer-2 rollup exclusively for identity management."
        ],
        answer: "C) Leverage Rialo's **Native Identity and 2FA** support for familiar Web2-style authentication."
    },
    {
        // --- NEW UNIQUE QUESTION BASED ON YOUR REQUEST ---
        question: "DILEMMA 3: An automated trading agent built on Rialo needs to execute a complex liquidation that requires **sub-second confirmation and zero risk of reversal** to prevent financial loss. Which combination of Rialo features ensures this *real-time* and *immutable* execution?",
        choices: [
            "A) High TPS (Transactions Per Second) alone, relying on slow, probabilistic finality like a classic Proof-of-Work chain.",
            "B) Using a third-party bridge to a faster sidechain, accepting a 10-minute confirmation time.",
            "C) Leveraging **Sub-Second Latency** and **Deterministic Finality** within Rialo's **Event-Driven Execution Model**.",
            "D) Relying on a centralized exchange's API with an off-chain keeper bot to monitor the transaction."
        ],
        answer: "C) Leveraging **Sub-Second Latency** and **Deterministic Finality** within Rialo's **Event-Driven Execution Model**."
    },
    {
        question: "DILEMMA 4: A user wants to move assets from Solana to the Rialo Chain. What is the most frictionless method Rialo promotes, given its SVM compatibility?",
        choices: [
            "A) Force the user to sell all their Solana assets and re-buy them on Rialo.",
            "B) Use a risky, multi-signature **External Bridge** that can be vulnerable to hacks and delays.",
            "C) Rely on **Rialo's seamless cross-chain design** that avoids the clunky overhead of traditional middleware and bridges.",
            "D) Submit a governance proposal to freeze the assets until a validator manually confirms the transfer."
        ],
        answer: "C) Rely on **Rialo's seamless cross-chain design** that avoids the clunky overhead of traditional middleware and bridges."
    },
    {
        question: "DILEMMA 5: You are building an enterprise-grade dApp where **data integrity** is paramount. Rialo's technology is built with a focus on what secure programming paradigm?",
        choices: [
            "A) A classic Proof-of-Work (PoW) consensus mechanism.",
            "B) The highly secure, state-of-the-art **formal verification** common in the Move/Sui ecosystem.",
            "C) A simple, unverified Python script running on a cloud server.",
            "D) Relying on a single, centralized block producer for security checks."
        ],
        answer: "B) The highly secure, state-of-the-art **formal verification** common in the Move/Sui ecosystem."
    }
];

// --- Game Variables (KEEP THESE) ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 35; // Time in seconds
let timerInterval;
let gameActive = false;

// --- DOM Elements (KEEP THESE) ---
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');
const startButton = document.getElementById('start-button');

// --- Functions (KEEP THESE, they are the same logic) ---

function startGame() {
    if (gameActive) return; 

    gameActive = true;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 35;
    scoreEl.textContent = score;
    messageEl.textContent = '';
    startButton.style.display = 'none';
    messageEl.classList.remove('win-message'); // Clear end game styling

    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
    
    // Display the first question
    displayQuestion();
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
        endGame();
        return;
    }

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    
    // Update the question text to be a little smaller for the long dilemmas
    questionEl.innerHTML = `<span>Stage ${currentQuestionIndex + 1}: </span>${q.question}`;
    choicesEl.innerHTML = ''; 

    q.choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.innerHTML = choice; // Use innerHTML because choices contain bold tags
        button.onclick = () => checkAnswer(choice, q.answer, button);
        choicesEl.appendChild(button);
    });
}

function checkAnswer(selectedChoice, correctAnswer, button) {
    // Disable all choice buttons after one is selected
    Array.from(choicesEl.children).forEach(btn => btn.disabled = true);

    if (selectedChoice === correctAnswer) {
        score += 20; // Increased score for better feedback
        scoreEl.textContent = score;
        button.classList.add('correct');
        messageEl.textContent = "SUCCESS! You chose the Rialo solution. (+20 pts)";
    } else {
        button.classList.add('incorrect');
        // Show the correct answer if they got it wrong
        messageEl.innerHTML = `INEFFICIENT! You chose the old-Web3 way.<br>The seamless solution was: <strong>${correctAnswer}</strong>`;
    }

    // Move to the next question after a brief delay
    setTimeout(() => {
        currentQuestionIndex++;
        messageEl.textContent = '';
        displayQuestion();
    }, 2500); // Increased delay for reading the longer feedback
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    
    questionEl.innerHTML = "<h2>CHALLENGE COMPLETE!</h2>";
    choicesEl.innerHTML = ''; 
    
    messageEl.classList.add('win-message');
    messageEl.innerHTML = `FINAL SCORE: <strong>${score} / 100 points</strong>.<br>You've mastered the Rialo Bridging Challenge!`;
    
    startButton.textContent = "RESTART CHALLENGE";
    startButton.style.display = 'block';
}

// --- Event Listener ---
startButton.addEventListener('click', startGame);

// Initialize the display before starting
questionEl.innerHTML = "Ready to build? Select the most efficient solution for each dApp dilemma!";
timerEl.textContent = timeLeft;
