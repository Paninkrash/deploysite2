export default {
    template: `
        <div :class="'test-na-reakciyu-reaction-test'">
            <h2>Тест на реакцию</h2>
            <div v-if="!testStarted" :class="'test-na-reakciyu-start-screen'">
                <button 
                    @click="startTest" 
                    :class="'test-na-reakciyu-start-button'"
                >НАЧАТЬ ТЕСТ</button>
                <p>Когда тест начнется, дождитесь, пока загорится зеленый цвет и нажмите на кнопку или на пробел.</p>
            </div>
            <div v-else>
                 <button 
                v-if="!targetVisible" 
                :class="'test-na-reakciyu-waiting'"
                disabled>ПРИГОТОВЬТЕСЬ...</button>
                <button 
                    v-if="targetVisible"
                    @click="recordReaction"
                    :class="'test-na-reakciyu-reaction-button'"
                    ref="reactionButton"
                    tabindex="0"
                >НАЖМИТЕ ПРОБЕЛ ИЛИ КЛИКНИТЕ</button>
                <div v-if="reactionTime !== null" :class="'test-na-reakciyu-results'">
                <button 
                        @click="resetTest" 
                        :class="'test-na-reakciyu-retry-button'">Попробовать еще раз</button>
                    <p>Ваше время реакции: <strong>{{ reactionTime }} мс</strong></p>
                    <p><strong>150–200 мс</strong><br>
Реакция элитного уровня, характерная для спортсменов высшего класса и людей с хорошо тренированными рефлексами. Ваши нейронные связи работают максимально быстро и эффективно.</p>

<p><strong>201–250 мс</strong><br>
Превосходное время реакции, указывающее на отличную нейронную обработку и высокий уровень двигательного контроля. Такой результат часто встречается у профессиональных спортсменов и специалистов, работающих в условиях высокой ответственности.</p>

<p><strong>251–300 мс</strong><br>
Стандартный диапазон времени реакции для взрослых. Он отражает хорошо функционирующую нервную систему и типичную скорость когнитивной обработки информации.</p>

<p><strong>301–350 мс</strong><br>
Умеренно замедленные реакции, которые могут быть характерны для людей с менее активным образом жизни или для пожилых людей. Рекомендуется поддерживать активность для улучшения показателей.</p>

<p><strong>351–400 мс</strong><br>
Время реакции ниже среднего, что может свидетельствовать о снижении скорости когнитивной обработки или задержках в двигательных реакциях. Обратите внимание на образ жизни и при необходимости проконсультируйтесь со специалистом.</p>

<p><strong>Более 400 мс</strong><br>
Значительная задержка времени реакции. Если подобные результаты сохраняются или сопровождаются другими симптомами, рекомендуется обратиться к врачу для более детального обследования.</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            testStarted: false,
            targetVisible: false,
            reactionTime: null,
            startTime: null,
            timeoutId: null
        }
    },
    methods: {
        startTest() {
            this.testStarted = true;
            this.reactionTime = null;
            const delay = 1000 + Math.random() * 2000; // 1-3 секунды
            
            this.timeoutId = setTimeout(() => {
                this.targetVisible = true;
                this.startTime = performance.now();
                this.$nextTick(() => {
                    this.$refs.reactionButton?.focus();
                });
            }, delay);
        },
        handleKeyPress(e) {
            if (this.targetVisible && e.code === 'Space') {
                e.preventDefault(); // Предотвращаем прокрутку страницы пробелом
                this.recordReaction();
            }
        },
        recordReaction() {
            if (!this.targetVisible) return;
            
            const endTime = performance.now();
            this.reactionTime = Math.round(endTime - this.startTime);
            this.targetVisible = false;
            clearTimeout(this.timeoutId);
        },
        resetTest() {
            this.testStarted = false;
            this.targetVisible = false;
            this.reactionTime = null;
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
}
