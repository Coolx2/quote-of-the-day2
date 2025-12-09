const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'VT323', monospace;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9b59b6 100%);
    padding: 20px;
    transition: background 0.5s ease;
}

.container {
    width: 100%;
    max-width: 600px;
    text-align: center;
}

.title {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 40px;
    text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
    line-height: 1.6;
}

.quote-box {
    background: #ffffff;
    border-radius: 0;
    border: 4px solid #333;
    padding: 40px 30px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
    position: relative;
    margin-bottom: 30px;
    image-rendering: pixelated;
}

.quote-icon {
    font-family: 'Press Start 2P', cursive;
    font-size: 3rem;
    color: #9b59b6;
    opacity: 0.3;
    position: absolute;
    top: 10px;
    left: 15px;
    line-height: 1;
}

.quote-text {
    font-family: 'VT323', monospace;
    font-size: 1.8rem;
    color: #333333;
    line-height: 1.5;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
}

.quote-author {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7rem;
    color: #9b59b6;
    text-align: right;
    line-height: 1.6;
}

.quote-author::before {
    content: '- ';
}

.new-quote-btn {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
    color: #ffffff;
    background: #9b59b6;
    border: 4px solid #333;
    border-radius: 0;
    padding: 15px 30px;
    cursor: pointer;
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.1s ease;
    text-transform: uppercase;
}

.new-quote-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
}

.new-quote-btn:active {
    transform: translate(4px, 4px);
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
}

.new-quote-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.quote-text.loading {
    opacity: 0.5;
}

.cat-sticker {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100;
}

.cat-sticker svg {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
}

@media (max-width: 600px) {
    .title {
        font-size: 1rem;
        margin-bottom: 30px;
    }

    .quote-box {
        padding: 30px 20px;
    }

    .quote-icon {
        font-size: 2rem;
        top: 5px;
        left: 10px;
    }

    .quote-text {
        font-size: 1.4rem;
    }

    .quote-author {
        font-size: 0.6rem;
    }

    .new-quote-btn {
        font-size: 0.6rem;
        padding: 12px 20px;
    }

    .cat-sticker svg {
        width: 80px;
        height: 80px;
    }
}

const newQuoteBtn = document.getElementById('new-quote-btn');

const backgroundColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9b59b6 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
    'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)'
];

let currentColorIndex = 0;

function changeBackground() {
    currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
    document.body.style.background = backgroundColors[currentColorIndex];
}

async function fetchQuote() {
    newQuoteBtn.disabled = true;
    newQuoteBtn.textContent = 'LOADING...';
    quoteText.classList.add('loading');

    changeBackground();

    try {
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }

        const data = await response.json();
        
        quoteText.textContent = data.content;
        quoteAuthor.textContent = data.author;
        quoteAuthor.style.display = 'block';

    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = 'Oops! Could not fetch a quote. Please try again.';
        quoteAuthor.style.display = 'none';
    } finally {
        newQuoteBtn.disabled = false;
        newQuoteBtn.textContent = 'NEW QUOTE';
        quoteText.classList.remove('loading');
    }
}

newQuoteBtn.addEventListener('click', fetchQuote);
