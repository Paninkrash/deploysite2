export default {
    template: `
        <div class="chislovye-posledovatelnosti-test">
            <h2>Тест "Числовые последовательности"</h2>
            
            <div v-if="!testStarted" class="chislovye-posledovatelnosti-instructions">
                <p>В каждом ряду пропущено одно число. Выберите правильный вариант.</p>
                <p>Всего 10 заданий. Вводите число в поле ответа.</p>
                <button @click="startTest" class="chislovye-posledovatelnosti-start-btn">Начать тест</button>
            </div>
            
            <div v-if="testStarted && !testCompleted" class="chislovye-posledovatelnosti-question">
                <div class="chislovye-posledovatelnosti-progress">Задание {{ currentQuestion + 1 }} из 10</div>
                <div class="chislovye-posledovatelnosti-sequence">
                    <span v-for="(num, index) in sequences[currentQuestion].sequence" 
                          :key="index">
                        {{ num === null ? '___' : num }}
                    </span>
                </div>
                <div class="chislovye-posledovatelnosti-answer-input">
                    <input 
                        type="number" 
                        v-model.number="userAnswers[currentQuestion]"
                        placeholder="Введите число"
                        @keyup.enter="nextQuestion"
                        class="chislovye-posledovatelnosti-input"
                    >
                    <button @click="nextQuestion" class="chislovye-posledovatelnosti-next-btn">
                        {{ currentQuestion < 9 ? 'Ответить' : 'Завершить' }}
                    </button>
                </div>
            </div>
            
            <div v-if="testCompleted" class="chislovye-posledovatelnosti-results">
                <h3>Тест завершен!</h3>
                <p>Правильных ответов: {{ correctAnswers }} из 10</p>
                <button @click="resetTest" class="chislovye-posledovatelnosti-retry-btn">Пройти тест еще раз</button>
            </div>
        </div>
    `,
    data() {
        return {
            testStarted: false,
            testCompleted: false,
            currentQuestion: 0,
            correctAnswers: 0,
            userAnswers: Array(10).fill(null),
            sequences: [
                {
                    sequence: [2, 4, 6, null, 10, 12],
                    answer: 8
                },
                {
                    sequence: [1, 4, 9, 16, null, 36],
                    answer: 25
                },
                {
                    sequence: [3, 6, 12, null, 48, 96],
                    answer: 24
                },
                {
                    sequence: [1, 1, 2, 3, 5, null],
                    answer: 8
                },
                {
                    sequence: [10, 7, null, 1, -2],
                    answer: 4
                },
                {
                    sequence: [2, 5, 10, 17, null, 37],
                    answer: 26
                },
                {
                    sequence: [1, 3, 6, null, 15, 21],
                    answer: 10
                },
                {
                    sequence: [5, 10, 20, 40, null, 160],
                    answer: 80
                },
                {
                    sequence: [1, 8, 27, null, 125],
                    answer: 64
                },
                {
                    sequence: [1, 2, 4, 8, null, 32],
                    answer: 16
                }
            ]
        }
    },
    methods: {
        startTest() {
            this.testStarted = true;
            this.testCompleted = false;
            this.currentQuestion = 0;
            this.correctAnswers = 0;
            this.userAnswers = Array(10).fill(null);
        },
        nextQuestion() {
            if (this.userAnswers[this.currentQuestion] === null) return;
            
            if (this.userAnswers[this.currentQuestion] === this.sequences[this.currentQuestion].answer) {
                this.correctAnswers++;
            }
            
            if (this.currentQuestion < 9) {
                this.currentQuestion++;
            } else {
                this.testCompleted = true;
            }
        },
        resetTest() {
            this.testStarted = false;
            this.testCompleted = false;
        }
    }
}