/* ================= PAGE NAVIGATION & MENU TOGGLE ================= */

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(function (page) {
        page.classList.toggle('active', page.id === pageId);
    });

    document.querySelectorAll('nav button[data-page]').forEach(function (button) {
        button.classList.toggle('active', button.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Automatically collapse nav on mobile after clicking a page link
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.remove('show');
    }
}

// Toggle mobile navigation visibility via brand mark
const brandToggle = document.getElementById('brandToggle');
const mainNav = document.getElementById('mainNav');

if (brandToggle && mainNav) {
    brandToggle.addEventListener('click', function () {
        mainNav.classList.toggle('show');
    });

    brandToggle.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mainNav.classList.toggle('show');
        }
    });
}

document.querySelectorAll('nav button[data-page]').forEach(function (button) {
    button.addEventListener('click', function () {
        showPage(button.dataset.page);
    });
});

document.querySelectorAll('[data-go]').forEach(function (button) {
    button.addEventListener('click', function () {
        showPage(button.dataset.go);
    });
});


/* ================= INTERACTIVE MONEY LAB ================= */

const amountA = document.getElementById('amountA');
const amountB = document.getElementById('amountB');

function money(value) {
    return 'RM' + Number(value).toLocaleString('en-MY');
}

function updateLab() {
    const a = Number(amountA.value);
    const b = Number(amountB.value);
    const sum = a + b;

    document.getElementById('labelA').textContent = money(a);
    document.getElementById('labelB').textContent = money(b);
    document.getElementById('total').textContent = money(sum);

    document.getElementById('equation').textContent =
        money(a) + ' + ' + money(b) + ' = ' + money(sum);

    document.getElementById('limitNote').textContent =
        sum <= 10000
            ? 'Great exploring! The total is within RM10,000.'
            : 'Your total is above RM10,000. Try lowering an amount.';
}

amountA.addEventListener('input', updateLab);
amountB.addEventListener('input', updateLab);

document.getElementById('resetLab').addEventListener('click', function () {
    amountA.value = 1250;
    amountB.value = 2375;
    updateLab();
});


/* ================= TREASURE HUNT ================= */

const missionAnswers = {
    1: '3625',
    2: '3750',
    3: '7225'
};

const missionDone = {
    1: false,
    2: false,
    3: false
};

function checkMoneyMission(number, answer) {
    const feedback = document.getElementById('missionFeedback' + number);
    const correct = answer === missionAnswers[number];

    if (correct) {
        missionDone[number] = true;
        feedback.textContent = '🌟 Correct! You unlocked this challenge.';
        feedback.className = 'feedback show correct';
    } else {
        missionDone[number] = false;
        feedback.textContent = '💗 Not quite. Try calculating the amounts again.';
        feedback.className = 'feedback show incorrect';
    }

    const score = Object.values(missionDone).filter(Boolean).length;

    document.getElementById('missionScore').textContent = score + '/3';

    document.getElementById('missionResult').textContent =
        score === 3
            ? '👑 Congratulations! You are a Money Master!'
            : 'Keep going! Complete all three challenges to collect your badge.';
}

function resetMoneyMission() {
    [1, 2, 3].forEach(function (number) {
        missionDone[number] = false;

        const feedback = document.getElementById('missionFeedback' + number);
        feedback.textContent = '';
        feedback.className = 'feedback';
    });

    document.getElementById('missionScore').textContent = '0/3';

    document.getElementById('missionResult').textContent =
        'Complete all three challenges to collect your badge!';
}


/* ================= ENCOURAGEMENT ================= */

(function () {
    const messages = [
        "You are capable of amazing things. Keep learning!",
        "Every mistake is a chance to learn something new!",
        "Believe in yourself. You can do it!",
        "Small steps every day lead to big achievements!",
        "You are a math superstar! Keep shining!",
        "Don't give up! Your hard work will pay off!",
        "Learning is an adventure. Enjoy every moment!",
        "You are smarter than you think! Keep going!",
        "Be proud of how far you have come!",
        "Keep trying, keep smiling, and never stop learning!"
    ];

    let lastIndex = -1;

    window.newEncouragement = function () {
        let index;

        do {
            index = Math.floor(Math.random() * messages.length);
        } while (index === lastIndex && messages.length > 1);

        lastIndex = index;

        document.getElementById("encouragement-message").textContent =
            messages[index];
    };
})();