
var pedCreator = new Vue({
    el: '#pedCreator',
    data: {
        active: false,
        show: 3,
        data: {
            gender: 0,
            name: '',
            surname: '',
            father: 8,
            mother: 5,
            age: 19,
            faceMix: 50,
            skinMix: 50,
            structure: new Array(20).fill(0),
            hair: [0, 0, 0, -1],
            clothes: [-1, 1, 1, 1, 1, -1]
        },
        structureLabels: [
            'Ширина носа',
            'Высота носа',
            'Длинна носа',
            'Мост носа',
            'Кончик носа',
            'Вал носового моста',
            'Высота бровей',
            'Глубина бровей',
            'Высота скул',
            'Ширина скул',
            'Глубина щеки',
            'Размер глаз',
            'Толщина губ',
            'Ширина челюсти',
            'Высота челюсти',
            'Длина подбородка',
            'Высота подбородка',
            'Ширина подбородка',
            'Форма подбородка',
            'Длина шеи'
        ],
        parents: {
            fatherIndex: 7,
            motherIndex: 4,
            fathers: [
                { name: 'Бенджамин', id: 0, image: './systems/pedCreator/img/parents/male/0.png' },
                { name: 'Даниэль', id: 1, image: './systems/pedCreator/img/parents/male/1.png' },
                { name: 'Джошуа', id: 2, image: './systems/pedCreator/img/parents/male/2.png' },
                { name: 'Ной', id: 3, image: './systems/pedCreator/img/parents/male/3.png' },
                { name: 'Эндрю', id: 4, image: './systems/pedCreator/img/parents/male/4.png' },
                { name: 'Джуан', id: 5, image: './systems/pedCreator/img/parents/male/5.png' },
                { name: 'Алекс', id: 6, image: './systems/pedCreator/img/parents/male/6.png' },
                { name: 'Исак', id: 7, image: './systems/pedCreator/img/parents/male/7.png' },
                { name: 'Иван', id: 8, image: './systems/pedCreator/img/parents/male/8.png' },
                { name: 'Итан', id: 9, image: './systems/pedCreator/img/parents/male/9.png' },
                { name: 'Винцент', id: 10, image: './systems/pedCreator/img/parents/male/10.png' },
                { name: 'Ангел', id: 11, image: './systems/pedCreator/img/parents/male/11.png' },
                { name: 'Диего', id: 12, image: './systems/pedCreator/img/parents/male/12.png' },
                { name: 'Адриан', id: 13, image: './systems/pedCreator/img/parents/male/13.png' },
                { name: 'Габриэл', id: 14, image: './systems/pedCreator/img/parents/male/14.png' },
                { name: 'Майкл', id: 15, image: './systems/pedCreator/img/parents/male/15.png' },
                { name: 'Сантьяго', id: 16, image: './systems/pedCreator/img/parents/male/16.png' },
                { name: 'Кевин', id: 17, image: './systems/pedCreator/img/parents/male/17.png' },
                { name: 'Льюис', id: 18, image: './systems/pedCreator/img/parents/male/18.png' },
                { name: 'Самуэль', id: 19, image: './systems/pedCreator/img/parents/male/19.png' },
                { name: 'Антоний', id: 20, image: './systems/pedCreator/img/parents/male/20.png' },
                { name: 'Клод', id: 42, image: './systems/pedCreator/img/parents/male/42.png' },
                { name: 'Нико', id: 43, image: './systems/pedCreator/img/parents/male/43.png' },
                { name: 'Джон', id: 44, image: './systems/pedCreator/img/parents/male/44.png' },
            ],
            mothers: [
                { name: 'Ханна', id: 21, image: './systems/pedCreator/img/parents/female/21.png' },
                { name: 'Обри', id: 22, image: './systems/pedCreator/img/parents/female/22.png' },
                { name: 'Жасмин', id: 23, image: './systems/pedCreator/img/parents/female/23.png' },
                { name: 'Гизела', id: 24, image: './systems/pedCreator/img/parents/female/24.png' },
                { name: 'Эмилия', id: 25, image: './systems/pedCreator/img/parents/female/25.png' },
                { name: 'Изабелла', id: 26, image: './systems/pedCreator/img/parents/female/26.png' },
                { name: 'Зу', id: 27, image: './systems/pedCreator/img/parents/female/27.png' },
                { name: 'Ава', id: 28, image: './systems/pedCreator/img/parents/female/28.png' },
                { name: 'Камилия', id: 29, image: './systems/pedCreator/img/parents/female/29.png' },
                { name: 'Виолет', id: 30, image: './systems/pedCreator/img/parents/female/30.png' },
                { name: 'Софи', id: 31, image: './systems/pedCreator/img/parents/female/31.png' },
                { name: 'Эвелин', id: 32, image: './systems/pedCreator/img/parents/female/32.png' },
                { name: 'Николь', id: 33, image: './systems/pedCreator/img/parents/female/33.png' },
                { name: 'Эшли', id: 34, image: './systems/pedCreator/img/parents/female/34.png' },
                { name: 'Грейси', id: 35, image: './systems/pedCreator/img/parents/female/35.png' },
                { name: 'Брианна', id: 36, image: './systems/pedCreator/img/parents/female/36.png' },
                { name: 'Натали', id: 37, image: './systems/pedCreator/img/parents/female/37.png' },
                { name: 'Оливия', id: 38, image: './systems/pedCreator/img/parents/female/38.png' },
                { name: 'Элизабет', id: 39, image: './systems/pedCreator/img/parents/female/39.png' },
                { name: 'Шарль', id: 40, image: './systems/pedCreator/img/parents/female/40.png' },
                { name: 'Эмма', id: 41, image: './systems/pedCreator/img/parents/female/41.png' },
                { name: 'Мисти', id: 45, image: './systems/pedCreator/img/parents/female/45.png' },
            ]
        },
        genders: [
            'Мужской', 'Женский'
        ],
        characteristics: {
            topindex: 2,
            brows: [
                'Красивые',
                'Сойдёт',
                'Хз айди 3 занч норм',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
            ],
            eyes: [
                'Красные',
                'В цвет брад',
                'В цвет))',
                'Пока хуй увидишь',
                'Ладно потом доделаю',
                'Щас уже выбор одежды'
            ],
        },
        appearance: {
            index: 0,
            hairs: [
                'Лысый',
                'Крутая сука хД',
                'как у меня',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))',
                'как у мамы))', 'как у мамы))'
            ],
            beards: [
                'Нет',
                'Стильнентка',
                'Ну сойдёт'
            ]

        },
        clothes: {
            headIndex: 0,
            topIndex: 0,
            undershitsIndex: 0,
            legsIndex: 0,
            shoesIndex: 0,
            glassesIndex: 0,
            male: {
                head: [
                    { name: 'Нет', id: 8 },
                    { name: 'Шапка', id: 2 },
                    { name: 'Кепка', id: 4 },
                    { name: 'Кепка 2', id: 6 }
                ],
                glasses: [
                    { name: 'Нет', id: 0 },
                    { name: 'Очки 1', id: 2 },
                    { name: 'Очки 2', id: 3 },
                    { name: 'Очки 3', id: 4 },
                    { name: 'Очки 4', id: 5 },
                    { name: 'Очки 5', id: 7 },
                    { name: 'Очки 6', id: 8 },
                    { name: 'Очки 7', id: 12 },
                ],
                tops: [
                    { name: 'Белая футболка', id: 0 },
                    { name: 'Белая кофта', id: 3 },
                    { name: 'Чёрная кофта', id: 6 },
                    { name: 'Футболка в полосочку', id: 9 },
                    { name: 'Белая рубашка', id: 13 },
                    { name: 'Серая футболка', id: 16 },
                    { name: 'Синяя рубашка', id: 26 },
                    { name: 'Футболка в полосочку', id: 33 },
                ],
                undershits: [
                    { name: 'Нет', id: 15 },
                    { name: 'Белая майка', id: 1 },
                    { name: 'Рубашка', id: 4 },
                    { name: 'Синня футболка', id: 8 },
                    { name: 'Футболка в полосочку', id: 9 },
                    { name: 'Белая сорочка', id: 11 },
                ],
                legs: [
                    { name: 'Белые штаны', id: 0 },
                    { name: 'Белые штаны2', id: 4 },
                    { name: 'Белые штаны3', id: 6 },
                    { name: 'Белые штаны3', id: 9 },
                    { name: 'Белые штаны3', id: 10 },
                    { name: 'Белые штаны3', id: 12 },
                    { name: 'Белые штаны3', id: 16 },
                ],
                shoes: [
                    { name: 'Белые капцы', id: 1 },
                    { name: 'Белые капцы2', id: 3 },
                    { name: 'Белые капцы3', id: 5 },
                    { name: 'Белые штаны3', id: 6 },
                    { name: 'Белые штаны3', id: 9 },
                ],
                torso: [
                    { name: 'Обычный', id: 15 },
                ],
            },
            female: {
                head: [
                    { name: 'Кепка', id: 1 },
                    { name: 'Кепка2', id: 2 },
                    { name: 'Кепка3', id: 3 },
                ],
                glasses: [
                    { name: 'Нет', id: 5 },
                    { name: 'Очки 1', id: 1 },
                    { name: 'Очки 2', id: 2 },
                    { name: 'Очки 3', id: 6 },
                    { name: 'Очки 4', id: 11 },
                    { name: 'Очки 5', id: 14 },
                    { name: 'Очки 6', id: 16 },
                    { name: 'Очки 7', id: 20 },
                ],
                tops: [
                    { name: 'Белая футболка', id: 3 },
                    { name: 'Красная футболка', id: 6 },
                    { name: 'Голубая футболка', id: 7 },
                    { name: 'Голубая футболка', id: 9 },
                    { name: 'Голубая футболка', id: 10 },
                    { name: 'Голубая футболка', id: 17 },
                ],
                undershits: [
                    { name: 'Белая майка', id: 3 },
                    { name: 'Красная майка', id: 5 },
                    { name: 'Голубая майка', id: 11 },
                    { name: 'Голубая футболка', id: 13 },
                    { name: 'Голубая футболка', id: 20 },
                    { name: 'Голубая футболка', id: 37 },
                ],
                legs: [
                    { name: 'Белые штаны', id: 0 },
                    { name: 'Белые штаны2', id: 1 },
                    { name: 'Белые штаны3', id: 3 },
                    { name: 'Голубая футболка', id: 4 },
                    { name: 'Голубая футболка', id: 6 },
                    { name: 'Голубая футболка', id: 11 },
                    { name: 'Голубая футболка', id: 12 },
                    { name: 'Голубая футболка', id: 15 },
                    { name: 'Голубая футболка', id: 16 },
                ],
                shoes: [
                    { name: 'Белые капцы', id: 0 },
                    { name: 'Белые капцы2', id: 1 },
                    { name: 'Белые капцы3', id: 3 },
                    { name: 'Голубая футболка', id: 4 },
                    { name: 'Голубая футболка', id: 5 },
                    { name: 'Голубая футболка', id: 6 },
                    { name: 'Голубая футболка', id: 7 },
                    { name: 'Голубая футболка', id: 11 },
                    { name: 'Голубая футболка', id: 16 },
                ],
                torso: [
                    { name: 'Обычный', id: 15 },
                ],
            }
        },
        error: {
            active: false,
            text: ''
        },
    },
    methods: {
        changeGender(t) {
            if (t == 1) {
                if (this.data.gender == 1) return;
                this.data.gender++;
            } else {
                if (this.data.gender == 0) return;
                this.data.gender--;
            }
            mp.trigger('pedCreator_updateData', JSON.stringify(this.data), 'gender');

        },
        clickRight(t) {
            // Camera
            //
            // Выбор папы
            if (t == 1) {
                if (this.parents.fatherIndex == this.parents.fathers.length - 1) return this.parents.fatherIndex = 0;
                this.parents.fatherIndex++;
                this.data.father = this.parents.fathers[this.parents.fatherIndex].id;
                this.updateData();
            }
            // Выбор мамы
            else if (t == 2) {
                if (this.parents.motherIndex == this.parents.mothers.length - 1) return this.parents.motherIndex = 0;
                this.parents.motherIndex++;
                this.data.mother = this.parents.mothers[this.parents.motherIndex].id;
                this.updateData();
            }
            // Брови
            else if (t == 3) {
                if (this.data.hair[1] == 33) return this.data.hair[0] = 0;
                this.data.hair[0]++;
                this.updateData();
            }
            // Цвет глаз
            else if (t == 4) {
                if (this.data.hair[1] == 32) return this.data.hair[1] = 0;
                this.data.hair[1]++;
                this.updateData();
            }
            //Причёска
            else if (t == 5) {
                if (this.data.hair[2] == 73) return this.data.hair[2] = 0;
                this.data.hair[2]++;
                this.updateData();
            }
            // Цвет волос
            else if (t == 6) {
                if (this.data.hairColor == 63) return this.data.hairColor = 0;
                this.data.hairColor++;
                this.updateData();
            }
            // Борода
            else if (t == 7) {
                if (this.data.hair[3] == 23) return this.data.hair[3] = 0;
                this.data.hair[3]++;
                this.updateData();
            }
            // Головной убор
            else if (t == 8) {
                if (this.data.gender == 0) {
                    if (this.clothes.headIndex == this.clothes.male.head.length - 1) {
                        this.clothes.headIndex = 0;
                        this.data.clothes[0] = this.clothes.male.head[this.clothes.headIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.headIndex++;
                    this.data.clothes[0] = this.clothes.male.head[this.clothes.headIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.headIndex == this.clothes.female.head.length - 1) return this.clothes.headIndex = 0;
                    this.clothes.headIndex++;
                    this.data.clothes[0] = this.clothes.female.head[this.clothes.headIndex].id;
                    this.updateData();
                }
            }
            // Верхняя одежда
            else if (t == 9) {
                if (this.data.gender == 0) {
                    if (this.clothes.topIndex == this.clothes.male.tops.length - 1) return this.clothes.topIndex = 0;
                    this.clothes.topIndex++;
                    this.data.clothes[1] = this.clothes.male.tops[this.clothes.topIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.topIndex == this.clothes.female.tops.length - 1) return this.clothes.topIndex = 0;
                    this.clothes.topIndex++;
                    this.data.clothes[1] = this.clothes.female.tops[this.clothes.topIndex].id;
                    this.updateData();
                }
            }
            // Майки
            else if (t == 10) {
                if (this.data.gender == 0) {
                    if (this.clothes.undershitsIndex == this.clothes.male.undershits.length - 1) return this.clothes.undershitsIndex = 0;
                    this.clothes.undershitsIndex++;
                    this.data.clothes[2] = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.undershitsIndex == this.clothes.female.undershits.length - 1) return this.clothes.undershitsIndex = 0;
                    this.clothes.undershitsIndex++;
                    this.data.clothes[2] = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
            }
            // Низ
            else if (t == 11) {
                if (this.data.gender == 0) {
                    if (this.clothes.legsIndex == this.clothes.male.legs.length - 1) return this.clothes.legsIndex = 0;
                    this.clothes.legsIndex++;
                    this.data.clothes[3] = this.clothes.male.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.legsIndex == this.clothes.female.legs.length - 1) return this.clothes.legsIndex = 0;
                    this.clothes.legsIndex++;
                    this.data.clothes[3] = this.clothes.female.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
            }
            // Капцы
            else if (t == 12) {
                if (this.data.gender == 0) {
                    if (this.clothes.shoesIndex == this.clothes.male.shoes.length - 1) return this.clothes.shoesIndex = 0;
                    this.clothes.shoesIndex++;
                    this.data.clothes[4] = this.clothes.male.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.shoesIndex == this.clothes.female.shoes.length - 1) return this.clothes.shoesIndex = 0;
                    this.clothes.shoesIndex++;
                    this.data.clothes[4] = this.clothes.female.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                }
            }
            // Очки)
            else if (t == 13) {
                if (this.data.gender == 0) {
                    if (this.clothes.glassesIndex == this.clothes.male.glasses.length - 1) return this.clothes.glassesIndex = 0;
                    this.clothes.glassesIndex++;
                    this.data.clothes[5] = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.glassesIndex == this.clothes.female.shoes.length - 1) return this.clothes.glassesIndex = 0;
                    this.clothes.glassesIndex++;
                    this.data.clothes[5] = this.clothes.female.shoes[this.clothes.glassesIndex].id;
                    this.updateData();
                }
            }
        },
        clickLeft(t) {
            // Camera
            //
            //Выбор папы
            if (t == 1) {
                if (this.parents.fatherIndex == this.parents.fathers.length - this.parents.fathers.length) return this.parents.fatherIndex = this.parents.fathers.length - 1;
                this.parents.fatherIndex--;
                this.data.father = this.parents.fathers[this.parents.fatherIndex].id;
                this.updateData();
            }
            // Выбор мамы
            else if (t == 2) {
                if (this.parents.motherIndex == this.parents.mothers.length - this.parents.mothers.length) return this.parents.motherIndex = this.parents.mothers.length - 1;
                this.parents.motherIndex--;
                this.data.mother = this.parents.mothers[this.parents.motherIndex].id;
                this.updateData();
            }
            // Брови
            else if (t == 3) {
                if (this.data.hair[0] == -1) return this.data.hair[0] = 33;
                this.data.hair[0]--;
                this.updateData();
            }
            // Цвет глаз
            else if (t == 4) {
                if (this.data.hair[1] == -1) return this.data.hair[1] = 31;
                this.data.hair[1]--;
                this.updateData();
            }
            // Причёска
            else if (t == 5) {
                if (this.data.hair[2] == 0) return this.data.hair[2] = 73;
                this.data.hair[2]--;
                this.updateData();
            }
            // Цвет волос
            else if (t == 6) {
                if (this.data.hairColor == 0) return this.data.hairColor = 63;
                this.data.hairColor--;
                this.updateData();
            }
            // Борода
            else if (t == 7) {
                if (this.data.hair[3] == -1) return this.data.hair[3] = 23;
                this.data.hair[3]--;
                this.updateData();
            }
            else if (t == 8) {
                if (this.data.gender == 0) {
                    if (this.clothes.headIndex == this.clothes.male.head.length - this.clothes.male.head.length) return this.clothes.headIndex = 0;
                    this.clothes.headIndex--;
                    this.data.clothes[0] = this.clothes.male.head[this.clothes.headIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.headIndex == this.clothes.female.head.length - 1) return this.clothes.headIndex = 0;
                    this.clothes.headIndex--;
                    this.data.clothes[0] = this.clothes.female.head[this.clothes.headIndex].id;
                    this.updateData();
                }
            }
            else if (t == 9) {
                if (this.data.gender == 0) {
                    if (this.clothes.topIndex == this.clothes.male.tops.length - this.clothes.male.tops.length) return this.clothes.topIndex = 0;
                    this.clothes.topIndex--;
                    this.data.clothes[1] = this.clothes.male.tops[this.clothes.topIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.topIndex == this.clothes.female.tops.length - this.clothes.female.tops.length) return this.clothes.topIndex = 0;
                    this.clothes.topIndex--;
                    this.data.clothes[1] = this.clothes.female.head[this.clothes.topIndex].id;
                    this.updateData();
                }
            }
            else if (t == 10) {
                if (this.data.gender == 0) {
                    if (this.clothes.undershitsIndex == this.clothes.male.undershits.length - this.clothes.male.undershits.length) return this.clothes.undershitsIndex = 0;
                    this.clothes.undershitsIndex--;
                    this.data.clothes[2] = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.undershitsIndex == this.clothes.female.tops.length - this.clothes.female.tops.length) return this.clothes.undershitsIndex = 0;
                    this.clothes.undershitsIndex--;
                    this.data.clothes[2] = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
            }
            else if (t == 11) {
                if (this.data.gender == 0) {
                    if (this.clothes.legsIndex == this.clothes.male.legs.length - this.clothes.male.legs.length) return this.clothes.legsIndex = 0;
                    this.clothes.legsIndex--;
                    this.data.clothes[3] = this.clothes.male.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.legsIndex == this.clothes.female.legs.length - this.clothes.female.legs.length) return this.clothes.legsIndex = 0;
                    this.clothes.legsIndex--;
                    this.data.clothes[3] = this.clothes.male.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
            }
            else if (t == 12) {
                if (this.data.gender == 0) {
                    if (this.clothes.shoesIndex == this.clothes.male.shoes.length - this.clothes.male.shoes.length) return this.clothes.shoesIndex = 0;
                    this.clothes.shoesIndex--;
                    this.data.clothes[4] = this.clothes.male.shoes[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.shoesIndex == this.clothes.female.shoes.length - this.clothes.female.shoes.length) return this.clothes.shoesIndex = 0;
                    this.clothes.shoesIndex--;
                    this.data.clothes[4] = this.clothes.female.undershits[this.clothes.shoesIndex].id;
                    this.updateData();
                }
            }
            // Очки)
            else if (t == 13) {
                if (this.data.gender == 0) {
                    if (this.clothes.glassesIndex == this.clothes.male.glasses.length - this.clothes.male.glasses.length) return this.clothes.glassesIndex = 0;
                    this.clothes.glassesIndex--;
                    this.data.clothes[5] = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.glassesIndex == this.clothes.female.glasses.length - this.clothes.female.glasses.length) return this.clothes.glassesIndex = 0;
                    this.clothes.glassesIndex--;
                    this.data.clothes[5] = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                }
            }
            else if (t == 14) {
                if (this.data.gender == 0) {
                    if (this.clothes.torsoIndex == this.clothes.male.torso.length - this.clothes.male.torso.length) return this.clothes.torso = 0;
                    this.clothes.torso--;
                    this.data.torso[6] = this.clothes.male.torso[this.clothes.torsoIndex].id;
                    this.updateData();
                }
                else {
                    if (this.clothes.torsoIndex == this.clothes.female.torso.length - this.clothes.female.torso.length) return this.clothes.torso = 0;
                    this.clothes.torso--;
                    this.data.clothes[5] = this.clothes.torso.glasses[this.clothes.torsoIndex].id;
                    this.updateData();
                }
            }
        },
        setOpen(s) {
            this.show = s;
        },
        updateData() {
            mp.trigger('pedCreator_updateData', JSON.stringify(this.data))
        },
        resetData() {
            for (let i = 0; i < this.data.structure.length; i++) {
                this.data.structure[i] = 0;
                this.updateData();
            }
        },
        createCharacter() {
            let rx = /^[а-яё\s-]+$/i;
            if (rx.test(this.data.name) || rx.test(this.data.surname)) return this.showError('Не должно быть русских букв')
            if (this.data.name.length < 4) return this.showError('Слишком короткое имя')
            if (this.data.surname.length < 6) return this.showError('Слишком короткая фамилия')
            this.updateData();
            mp.trigger('pedCreator_finishSync::CLIENT', JSON.stringify(this.data));
        },
        showError(text) {
            this.error.active = true;
            this.error.text = text;
            setTimeout(() => {
                this.closeError();
            }, 5000)
        },
        closeError() {
            this.error.active = false;
            this.error.text = '';
        },
        randomBtn() {
            // Ebalo
            for (i = 0; i < this.data.structure.length; i++) {
                let value = this.getRandomFloat(-1, 1);
                this.data.structure[i] = value;
            }
            this.data.father = this.getRandomInt(1, this.parents.fathers.length);
            this.data.mother = this.getRandomInt(1, this.parents.mothers.length);
            this.data.faceMix = this.getRandomFloat(0, 1)
            this.data.shapeMix = this.getRandomFloat(0, 1)

            // Odeja
            // for (i = 0; i < this.data.clothes.length; i++) {
            //     let value = this.getRandomInt(0, 10);
            //     this.data.clothes[i] = value;
            // }
            this.data.clothes[2] = this.getRandomInt(1, 73);
            this.data.clothes

            this.updateData()
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
    },
    watch: {
        // Схожесть с родителями
        'data.faceMix'(newVal) {
            this.updateData();
        },
        'data.skinMix'(newVal) {
            this.updateData();
        },
        // Характеристики лица
        'data.structure'(newVal) {
            this.updateData();
        },
    }
})

mp.events.add('pedCreator_show::CEF', () => {
    pedCreator.active = true;
    pedCreator.show = 1;
    pedCreator.updateData();
});