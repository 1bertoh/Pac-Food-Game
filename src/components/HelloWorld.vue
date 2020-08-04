/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable global-require */
<template>
<div id="janela">
  <v-row>

    <!-- Local de pontuação-->
    <v-col cols="1"
    class="mt-5"
    align='center'>
      <p class="title ml-5"> Level</p>
      <p class="title ml-5">{{level}}</p>
      <p class="title ml-5 mt-9">Score:</p>
      <p class="display-4 ml-5">
{{score}}
  </p>
  <v-col align='center'>
    <v-btn color="success"
    @click="msgGameOver = true">Recomeçar</v-btn>
  </v-col>
  </v-col>

<!-- Campo do jogo-->
<v-col cols="11">
  <v-container>
  <div id="campo">
    <div id="explosao" v-show="gameOver">
      <img id="explosao1" class="lazy-src" src="../assets/explosão-bg.jpg" >
    </div>

    <!--jogador-->
    <div id="quadradinho"  v-bind:style="{
      left: horizontal + 'px',
    top: vertical + 'px'    }">
    <div id="eye-left"></div>
    <div id="eye-right"></div>
    <div id="mouth"></div>
    <div id="tongue"></div>
    </div>

    <!-- comida-->
    <div id="food" v-bind:style="{
      left: foodHorizontal + 'px',
    top: foodVertical + 'px'    }">
  <img
  id="img1"
    :src="foods"
    width="65em"
    >
    </div>

    <!--bombas-->
    <img id="bomba"
    v-show="bombasLocal.length !== 0"
    v-for="bomb in bombasLocal" :key="bomb"
    src="../assets/bomba.png"
    v-bind:style="{
      left: bomb.localBombH + 'px',
      top: bomb.localBombV + 'px'    }"
    width="55em">
  </div>

  <v-col align='center'>
    <v-btn color="success" @click="move('up')"
    >W
    </v-btn>
  </v-col>
  <v-col align='center'>
    <v-btn color="success" class="mr-11"
    @click="move('left')">
    A
    </v-btn>
    <v-btn color="success" @click="move('down')">
    S
    </v-btn>
    <v-btn color="success" class="ml-11" @click="move('right')">
    D
    </v-btn>
  </v-col>
  </v-container>
</v-col>
  </v-row>
</div>
</template>
<!--
!!!!!!!!!!!!!!!!!!!CRIAR FASES, CADA FASE TERÁ UMA VELOCIDADE DIFERENTE!!!!!!!!!
-->
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  created() {
    this.foodSpawn();
  },
  data() {
    return {
      position: Number,
      horizontal: 0,
      vertical: 0,
      foodHorizontal: 100,
      foodVertical: 0,
      classe2: ['ml-10'],
      direcao: '',
      localComida: [],
      sobremessas: ['../src/assets/cupcake.png'],
      score: 0,
      level: 1,
      speed: 250,
      bombasLocal: [],
      coordY: 0,
      coordX: 0,
      image: ['../assets/bomba.jpeg'],
      gameOver: false,
      msgGameOver: false,
      // eslint-disable-next-line global-require
      foods: '',
    };
  },
  watch: {
    score: function teste() {
      if (this.level <= 5) {
        if (this.score % 5 === 0) {
          this.level += 1;
        }
      }
    },
    horizontal: function getFoodH() {
      const coordY = this.foodVertical - this.vertical;
      const coordX = this.foodHorizontal - this.horizontal;
      this.coordY = coordY;
      this.coordX = coordX;
      if (coordY < 40 && coordX < 40) {
        if (coordY >= 0 && coordX >= -40) {
          this.foodSpawn();
          this.score += 1;
        }
      }
      if (coordY <= -1 && coordX <= 40) {
        if (coordY > -40 && coordX > -40) {
          this.foodSpawn();
          this.score += 1;
        }
      }
      this.closeToBombs();
    },
    vertical: function getFoodH() {
      const coordY = this.foodVertical - this.vertical;
      const coordX = this.foodHorizontal - this.horizontal;
      this.coordY = coordY;
      this.coordX = coordX;
      if (coordY < 40 && coordX < 40) {
        if (coordY >= 0 && coordX >= -40) {
          this.foodSpawn();
          this.score += 1;
        }
      }
      if (coordY <= -1 && coordX <= 40) {
        if (coordY > -40 && coordX > -40) {
          this.foodSpawn();
          this.score += 1;
        }
      }
      this.closeToBombs();
    },
    msgGameOver: function F5() {
      if (this.msgGameOver === true) {
        document.location.reload();
      }
    },
  },
  mounted() {
    document.addEventListener('keypress', (e) => {
      const keyName = e.key;
      if (keyName === 'd') {
        this.move('right');
      }
      if (keyName === 'a') {
        this.move('left');
      }
      if (keyName === 's') {
        this.move('down');
      }
      if (keyName === 'w') {
        this.move('up');
      }
    });
    this.andar();
  },
  methods: {
    move(direction: string): number {
      if (direction === 'right') {
        if (this.horizontal === 1110) {
          return;
        }
        this.horizontal += 10;
        this.direcao = direction;
      }
      if (direction === 'left') {
        if (this.horizontal === 0) {
          return;
        }
        this.horizontal -= 10;
        this.direcao = direction;
      }
      if (direction === 'down') {
        if (this.vertical === 430) {
          return;
        }
        this.vertical += 10;
        this.direcao = direction;
      }
      if (direction === 'up') {
        if (this.vertical === 0) {
          return;
        }
        this.vertical -= 10;
        this.direcao = direction;
      }
    },
    foodSpawn(): number {
      this.speed -= 100;
      let localFoodV: number = Math.floor(Math.random() * 500 + 2) - 2;
      if (localFoodV > 430) {
        localFoodV = 430;
      }
      if (localFoodV % 10 !== 0) {
        const x = localFoodV % 10;
        localFoodV -= x;
      }
      this.foodVertical = localFoodV;
      let localFoodH: number = Math.floor(Math.random() * 1500 + 2) - 2;
      if (localFoodH > 1110) {
        localFoodH = 1110;
      }
      if (localFoodH % 10 !== 0) {
        const x = localFoodH % 10;
        localFoodH -= x;
      }
      this.foodHorizontal = localFoodH;
      this.criarBombas();
      this.randomFood();
      return localFoodV;
    },
    andar() {
      setInterval(() => this.move(this.direcao), this.speed);
    },
    criarBombas() {
      this.bombasLocal = [];
      let { level } = this;
      if (this.level > 5) {
        level = 5;
      }
      const qtd = level * 5;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < qtd; i++) {
        let localBombV: number = Math.floor(Math.random() * 500 + 2) - 2;
        if (localBombV > 430) {
          localBombV = 430;
        }
        if (localBombV % 10 !== 0) {
          const x = localBombV % 10;
          localBombV -= x;
        }
        let localBombH: number = Math.floor(Math.random() * 1300 + 2) - 2;
        if (localBombH > 1110) {
          localBombH = 1110;
        }
        if (localBombH % 10 !== 0) {
          const x = localBombH % 10;
          localBombH -= x;
        }
        this.bombasLocal.push({ localBombV, localBombH });
        this.sameLocalBombPlayer(localBombV, localBombH, i);
        this.sameLocalBombFood(localBombV, localBombH, i);
        // para n spawnar food e bomba no msm lugar
      }
    },
    sameLocalBombFood(bv: number, bh: number, i: number): number[] {
      const coordY: number = bv - this.foodVertical;
      const coordX: number = bh - this.foodHorizontal;
      this.coordY = coordY;
      this.coordX = coordX;
      if (coordY < 40 && coordX < 40) {
        if (coordY >= 0 && coordX >= -40) {
          const x = bv - 100;
          const y = bh - 100;
          this.bombasLocal[i].localBombV = x;
          this.bombasLocal[i].localBombH = y;
        }
      }
      if (coordY <= -1 && coordX <= 40) {
        if (coordY > -40 && coordX > -40) {
          const x = bv - 100;
          const y = bh - 100;
          this.bombasLocal[i].localBombV = x as number;
          this.bombasLocal[i].localBombH = y as number;
        }
      }
      return [coordY, coordX];
    },
    closeToBombs() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.bombasLocal.length; i++) {
        const coordY = this.bombasLocal[i].localBombV - this.vertical;
        const coordX = this.bombasLocal[i].localBombH - this.horizontal;
        this.coordY = coordY;
        this.coordX = coordX;
        if (coordY <= 30 && coordX <= 20) {
          if (coordY >= 0 && coordX >= -30) {
            this.gameOver = true;
            const x = window.confirm('Você perdeu.\nGostaria de tentar de novo? ');
            this.msgGameOver = x;
          }
          if (coordY <= -1 && coordX <= 40) {
            if (coordY > -50 && coordX > -40) {
              this.gameOver = true;
              const x = window.confirm('1Você perdeu.\nGostaria de tentar de novo? ');
              this.msgGameOver = x;
            }
          }
        }
      }
    },
    sameLocalBombPlayer(bv, bh, i) {
      const coordY = bv - this.vertical;
      const coordX = bh - this.horizontal;
      this.coordY = coordY;
      this.coordX = coordX;
      if (coordY < 60 && coordX < 60) {
        if (coordY >= 0 && coordX >= -60) {
          const x = bv - 100;
          const y = bh - 100;
          this.bombasLocal[i].localBombV = x;
          this.bombasLocal[i].localBombH = y;
        }
      }
      if (coordY <= -1 && coordX <= 60) {
        if (coordY > -60 && coordX > -60) {
          const x = bv - 100;
          const y = bh - 100;
          this.bombasLocal[i].localBombV = x;
          this.bombasLocal[i].localBombH = y;
        }
      }
    },
    randomFood() {
      const food: number = Math.floor(Math.random() * 10);
      const foodArr = ['https://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Cupcake-Vector-PNG-Transparent-Image.png',
        'https://pngriver.com/wp-content/uploads/2018/04/Download-Food-PNG.png',
        'https://www.freepngimg.com/thumb/burger/6-2-burger-png-image-thumb.png',
        'https://static.wixstatic.com/media/2cd43b_de870a7313e1454da9573de5162b4bd5~mv2_d_1750_1209_s_2.png',
        'http://www.pngmart.com/files/7/Pink-Donut-PNG-File.png',
        'https://cdn.pixabay.com/photo/2017/09/07/11/25/cupcake-2724786_960_720.png',
        'https://www.dsmenu.com/user-folder/images/2/2031/1482421554-2031.png',
        'https://imagensemoldes.com.br/wp-content/uploads/2020/05/Pudim-de-Leite-Doces-PNG-1200x787.png',
        'https://www.dsmenu.com/user-folder/images/2/2031/1482421554-2031.png',
        'https://imagensemoldes.com.br/wp-content/uploads/2020/05/Pudim-de-Leite-Doces-PNG-1200x787.png',
      ];
      // eslint-disable-next-line prefer-destructuring
      this.foods = foodArr[food];
    },
  },
});
</script>
<style lang="css">
  #janela {
    background: rgb(155,34,195);
    background: linear-gradient(0deg, rgba(155,34,195,1) 0%, rgba(253,233,45,1) 100%);
  }
  #campo {
    height: 30em;
    border: 1px solid black;
    background-color: blueviolet;

    position: relative;
  }
  #quadradinho {
    height: 3em;
    width: 3em;
    position: absolute;

    background-color: chartreuse;
  }
  #food {
    height: 3em;
    width: 3em;
    /*background-color: pink;*/
    position: absolute;}
    #img1 {
      position: absolute;
      top: -0.5em;
      left: -0.8em;
    }
  #bomba{
    position: absolute;
  }
    #explosao1 {
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 105%;
    }
  #eye-left {
    background-color: #000;
    position: absolute;
    margin: 7px;
    height: 10px;
    width: 10px;
  }
  #eye-right {
    position: absolute;
    background-color: #000;
    margin-top: 7px;
    margin-left: 30px;
    height: 10px;
    width: 10px;
  }
  #mouth {
    background-color: #000;
    position: absolute;
    margin-top: 1.9em;
    margin-left: 6px;
    height: 7px;
    width: 70%;
  }
  #tongue {
    background-color: red;
    position: absolute;
    margin-top: 2.2em;
    margin-left: 30%;
    height: 7px;
    width: 30%;
  }
</style>
