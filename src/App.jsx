import { useEffect, useState } from 'react'

import './App.css'

function App() {
  //state
  const [time, setTime] = useState(new Date())
  const [birthDay, setBirthDay] = useState(null)
  const [birthMonth, setBirthMonth] = useState(null)

  //function input TimeStamp and then return day,hours,minutes and seconds

  useEffect(() => {
    const intervalTask = setInterval(() => {
      setTime(new Date())
    }, 1000) //1000 millisecond = 1 second
    return () => clearInterval(intervalTask)
  }, [])

  const getCountdown = (birthDay, birthMonth) => {
    let birthYear = new Date().getFullYear()
    let birthDate = new Date(birthYear, birthMonth - 1, birthDay).getTime()
    let now = new Date().getTime() //จุดเริ่มต้นของการนับเวลาเป็นจากวันที่ 1 มกราคม ค.ศ. 1970 โดยหน่วนเป็น ms

    let timeCount = birthDate - now //convert milliseconds to seconds

    if (timeCount < 0) { //ตรวจสอบ Year ถ้าวันเกิดในปีนี้ผ่านไปแล้วจะ + 1 Year เป็นวันเกิดปีถัดไป
      birthYear++
      birthDate = new Date(birthYear, birthMonth - 1, birthDay).getTime()
      timeCount = birthDate - now
      //  console.log(timeCount)
    }
    timeCount = timeCount / (60 * 60 * 24) / 1000 //convert ms to days
    let days = Math.floor(timeCount)
    //console.log(days, "days")

    timeCount = (timeCount - days) * 24 //update & convert day to hour
    let hours = Math.floor(timeCount) //convert seconds to hours
    //console.log(hours, "hours")

    timeCount = (timeCount - hours) * 60 //update & convert hour to minute 
    let minutes = Math.floor(timeCount)
    // console.log(minutes, "minutes")

    timeCount = (timeCount - minutes) * 60 //update & convert minute to minute seconds
    let seconds = Math.floor(timeCount)
    // console.log(seconds, "seconds")

    //console.log(birthYear, days, hours)
    return [days, hours, minutes, seconds]
  }

  // console.log(getCountdown(birthDay, birthMonth))//ทำงานได้



  return (
    <div className='container'>
      {/* {time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}{' '}
      {time.getHours()}:{time.getMinutes() + 1}:{time.getSeconds()} */}


      <section className='Countdown-head'>
        <h1>Countdown to my birthday</h1>
      </section>

      <section className='set-birthday'>
        <label>วันเกิด/เดือนเกิด:</label>
        <input type="number" min={1} max={31} value={birthDay} onChange={(birthDay) => setBirthDay(birthDay.target.value)} />
        <span>{"/"}</span>
        <input type="number" min={1} max={12} value={birthMonth} onChange={(birthMonth) => setBirthMonth(birthMonth.target.value)} />
        <br />
      </section>


      <section className='countdown-container'>
        <div className='countdown-item'>{getCountdown(birthDay, birthMonth)[0]}<div className='date'>Days</div></div>
        <div className='countdown-item'>{getCountdown(birthDay, birthMonth)[1]}<div className='date'>Hours</div></div>
        <div className='countdown-item'>{getCountdown(birthDay, birthMonth)[2]}<div className='date'>Minutes</div></div>
        <div className='countdown-item'>{getCountdown(birthDay, birthMonth)[3]}<div className='date'>Seconds</div></div>
      </section>

    </div>

  )
}

export default App
