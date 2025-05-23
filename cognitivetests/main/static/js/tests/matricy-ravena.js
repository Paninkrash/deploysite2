export default {
    template: `
        <div class="raven-test">
            <h2>Тест "Матрицы Равена" (серия E)</h2>
            
            <div v-if="!testStarted" class="raven-instructions">
                <p>Выберите недостающий элемент из предложенных вариантов.</p>
                <p>Всего 12 заданий. Вводите номер правильного ответа в поле.</p>
                <button @click="startTest" class="raven-start-btn">Начать тест</button>
            </div>
            
            <div v-if="testStarted && !testCompleted" class="raven-question">
                <div class="raven-progress">Задание {{ currentQuestion + 1 }} из 12</div>
                <img :src="imagePaths[currentQuestion]" alt="Матрица Равена" class="raven-image">
                <div class="raven-answer-input">
                    <input 
                        type="number" 
                        v-model.number="userAnswers[currentQuestion]"
                        min="1"
                        max="8"
                        placeholder="Введите ответ"
                        @keyup.enter="nextQuestion"
                    >
                    <button @click="nextQuestion" class="raven-next-btn">
                        {{ currentQuestion < 11 ? 'Ответить' : 'Завершить' }}
                    </button>
                </div>
            </div>
            
            <div v-if="testCompleted" class="raven-results">
                <h3>Тест завершен!</h3>
                <p>Правильных ответов: {{ correctAnswers }} из 12</p>
                <button @click="resetTest" class="raven-retry-btn">Пройти тест еще раз</button>
            </div>
        </div>
    `,
    data() {
        return {
            testStarted: false,
            testCompleted: false,
            currentQuestion: 0,
            correctAnswers: 0,
            userAnswers: Array(12).fill(null),
            correctOptions: [7, 6, 8, 2, 1, 5, 1, 6, 3, 2, 4, 5],
            imagePaths: [
                '/static/image/raven/RR1.png',
                '/static/image/raven/RR2.png',
                '/static/image/raven/RR3.png',
                '/static/image/raven/RR4.png',
                '/static/image/raven/RR5.png',
                '/static/image/raven/RR6.png',
                '/static/image/raven/RR7.png',
                '/static/image/raven/RR8.png',
                '/static/image/raven/RR9.png',
                '/static/image/raven/RR10.png',
                '/static/image/raven/RR11.png',
                '/static/image/raven/RR12.png'
            ]
        }
    },
    methods: {
        startTest() {
            this.testStarted = true;
            this.testCompleted = false;
            this.currentQuestion = 0;
            this.correctAnswers = 0;
            this.userAnswers = Array(12).fill(null);
        },
        nextQuestion() {
            if (this.userAnswers[this.currentQuestion] === null) return;
            
            if (this.userAnswers[this.currentQuestion] === this.correctOptions[this.currentQuestion]) {
                this.correctAnswers++;
            }
            
            if (this.currentQuestion < 11) {
                this.currentQuestion++;
            } else {
                this.testCompleted = true;
            }
        },
        resetTest() {
            this.testStarted = false;
            this.testCompleted = false;
        }
    },

}