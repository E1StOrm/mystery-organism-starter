// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    _specimenNum: specimenNum,
    _dna: dna,

    get specimenNum() {
      return this._specimenNum;
    },

    set specimenNum(specimenNum) {
      this.specimenNum = specimenNum;
    },

    get dna() {
      return this._dna;
    },

    set dna(dna) {
      this.dna = dna;
    },

    mutate() {
      let randomBase;
      for (let i = 0; i < this._dna.length; i++) {
        while (true) {
          randomBase = returnRandBase();
          if (randomBase !== this._dna[i]) {
            this._dna[i] = randomBase;
            break;
          }
        }
      }
    },

    compareDNA(otherDNA) {
      let matches = 0;
      for (let i = 0; i < this._dna.length; i++) {
        if (this.dna[i] === otherDNA.dna[i]) {
          matches++;
        }
      }
      const prc = Math.floor(100 / this.dna.length * matches);
      console.log(`specimen ${this.specimenNum} and specimen ${otherDNA.specimenNum} have ${prc}% DNA in common`);
    },

    willLikelySurvive() {
      const cgBases = this.dna.filter(bs => bs === "C" || bs === "G").length;
      return Math.floor(100 / this.dna.length * cgBases) >= 60;
    }
  }
};

const firstOrganism = pAequorFactory(100, mockUpStrand());
const secondOrganism = pAequorFactory(200, mockUpStrand());

// firstOrganism.compareDNA(secondOrganism);
// secondOrganism.compareDNA(firstOrganism);
// console.log(firstOrganism.willLikelySurvive());

const likelySurvive30 = [];
let count = 0, likelySurvive;
while (count < 30) {
  likelySurvive = pAequorFactory(++count, mockUpStrand());
  while (!likelySurvive.willLikelySurvive())
    likelySurvive.mutate();
  likelySurvive30.push(likelySurvive);
}

console.log(likelySurvive30.map(org => org.dna.join(" : ")));
