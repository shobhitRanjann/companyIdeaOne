import { useState } from 'react';
import './App.css'
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {

  const[amount, setAmount] = useState(0)
  const[from, setFrom] = useState("usd")
  const[to,setTo] = useState("inr")
  const[convertedAmount,setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from);

  const options= Object.keys(currencyInfo)

  const swap = () => {
      setFrom(to)
      setTo(from)
      setConvertedAmount(amount)
      setAmount(convertedAmount)
  }

  const convert = () =>{
    console.log(amount , "" ,currencyInfo[to] )
    setConvertedAmount(amount * currencyInfo[to])
  }

  const getNum = (num) => {
    if (!isNaN(num)) {
        setAmount(num)
    }
  }



  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/18503093/pexels-photo-18503093/free-photo-of-rural-life-15.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(cu)=>setFrom(cu)}
                            selectCurrency={from}
                            onAmountChange={(am) => getNum(am)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                    <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(cu)=>setTo(cu)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
