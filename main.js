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
      console.log(`specimen ${this.specimenNum} and specimen ${otherDNA.specimenNum} have ${this.cmpDNA(otherDNA)}% DNA in common`);
    },

    cmpDNA(otherDNA) {
      let matches = 0;
      for (let i = 0; i < this._dna.length; i++) {
        if (this.dna[i] === otherDNA.dna[i]) {
          matches++;
        }
      }
      return Math.round(100 / this.dna.length * matches);
    },

    willLikelySurvive() {
      const cgBases = this.dna.filter(bs => bs === "C" || bs === "G").length;
      return Math.floor(100 / this.dna.length * cgBases) >= 60;
    },

    complementStrand() {
      return this.dna.map(n => n == 'A' ? 'T' : n == 'T' ? 'A' : n == 'C' ? 'G' : n == 'G' ? 'C' : n);
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

// console.log(likelySurvive30.map(org => org.dna.join(" : ")));

// Show main strands and complement strands of likelySurvive30 dna 
/*for (let currentDNA of likelySurvive30) {
  console.log(currentDNA.specimenNum + ": " + currentDNA.dna.join(":"));
  console.log(currentDNA.specimenNum + ": " + currentDNA.complementStrand().join(":"));
  console.log();
}*/

const bestDNA = {
  "one": likelySurvive30[0],
  "two": likelySurvive30[1],
  "cmp": likelySurvive30[0].cmpDNA(likelySurvive30[1])
};

for (let i = 0; i < likelySurvive30.length; i++) {
  for (let j = i + 1; j < likelySurvive30.length; j++) {
    let cmpResult = likelySurvive30[i].cmpDNA(likelySurvive30[j]);
    if (bestDNA  .cmp < cmpResult) {
      bestDNA.one = likelySurvive30[i];
      bestDNA.two = likelySurvive30[j];
      bestDNA.cmp = cmpResult;
    }
  }
}

console.log(`${bestDNA.one.dna.join(":")} and ${bestDNA.two.dna.join(":")} compare to ${bestDNA.cmp}%`);
