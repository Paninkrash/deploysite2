export default {
    template: `
        <div class="stroop-test">
            <h2>Тест Струпа</h2>
            <div v-if="!testStarted" class="stroop-instructions">
                <p>Найдите все слова, где <strong>цвет текста совпадает</strong> со значением слова.</p>
                <p>У вас есть 40 секунд. Правильных ответов: 12 из 50.</p>
                <button @click="startTest" class="stroop-start-btn">Начать</button>
            </div>
            
            <div v-if="testStarted && !timeUp && !allFound" class="stroop-game">
                <div class="stroop-timer">Осталось: {{ timeLeft }} сек</div>
                <div class="stroop-grid">
                    <div v-for="(word, index) in words" 
                         :key="index"
                         :class="['stroop-word', word.colorClass, { 'found': word.found }]"
                         @click="checkWord(word)">
                        {{ word.found ? '✓ ' + word.text : word.text }}
                    </div>
                </div>
            </div>
            
            <div v-if="timeUp || allFound" class="stroop-results">
                <h3>Тест {{ allFound ? 'пройден' : 'завершен' }}!</h3>
                <p>Правильных ответов: {{ correctCount }}/12</p>
                <button @click="resetTest" class="stroop-retry-btn">Ещё раз</button>
            </div>
        </div>
    `,
    data() {
        return {
            testStarted: false,
            timeLeft: 40,
            timeUp: false,
            allFound: false,
            correctCount: 0,
            colorMap: {
                'красный': 'stroop-red',
                'синий': 'stroop-blue',
                'зелёный': 'stroop-green',
                'жёлтый': 'stroop-yellow'
            },
            words: [],
            timer: null
        }
    },
    methods: {
        startTest() {
            this.testStarted = true;
            this.timeLeft = 40;
            this.timeUp = false;
            this.allFound = false;
            this.correctCount = 0;
            this.generateWords();
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.endTest();
                }
            }, 1000);
        },
        generateWords() {
            const words = [];
            const colorKeys = Object.keys(this.colorMap);
            
            for (let i = 0; i < 12; i++) {
                const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                words.push({
                    text: color,
                    colorClass: this.colorMap[color],
                    isCorrect: true,
                    found: false
                });
            }

            for (let i = 0; i < 38; i++) {
                const text = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                let color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                while (color === text) {
                    color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                }
                words.push({
                    text: text,
                    colorClass: this.colorMap[color],
                    isCorrect: false,
                    found: false
                });
            }
            
            this.words = this.shuffleArray(words);
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        checkWord(word) {
            if (word.isCorrect && !word.found) {
                word.found = true;
                this.correctCount++;
                
                if (this.correctCount === 12) {
                    this.allFound = true;
                    this.endTest();
                }
            }
        },
        endTest() {
            clearInterval(this.timer);
            this.timeUp = true;
        },
        resetTest() {
            clearInterval(this.timer);
            this.testStarted = false;
            this.timeUp = false;
            this.allFound = false;
            this.words = [];
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
}