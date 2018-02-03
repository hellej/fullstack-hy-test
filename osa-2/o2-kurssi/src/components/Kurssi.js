import React from 'react'

const Opetusohjelma = () => {
   return (
      <h1>
         Opetusohjelma
      </h1>
   )
}

const Kurssit = ({ kurssit }) => {
   return (
      <div>
         <Opetusohjelma />
         {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
      </div>
   )

}

const Kurssi = ({ kurssi }) => {
   return (
      <div>
         <Otsikko nimi={kurssi.nimi} />
         <Sisalto osat={kurssi.osat} />
         <Yhteensa osat={kurssi.osat} />
      </div>
   )
}

const Otsikko = ({ nimi }) => {
   return (
      <h1>
         {nimi}
      </h1>
   )
}

const Sisalto = ({ osat }) => {
   // const osatLog = osat.map(osa => <Osa key={osa.id} osa={osa} />)
   // console.log(osatLog)

   return (
      <div>
         {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
      </div>
   )
}

const Osa = ({ osa }) => {
   return (
      <p>
         {osa.nimi} {osa.tehtavia}
      </p>
   )
}

const Yhteensa = ({ osat }) => {
   const yht = osat.reduce((sum, cur) => sum + cur.tehtavia, 0)
   // console.log("Yht: ", yht)
   return (
      <p>
         Yhteensä {yht} tehtävää.
      </p>
   )
}

export default Kurssit