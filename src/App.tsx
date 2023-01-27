import { FormEvent, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

import "./App.css";
import whatsLogo from "./assets/whatsapp.svg";
import WhatsappInput from "./components/WhatsappInput";
import { getPositionData, IPosition } from "./services/getCountry";
import { getWhatsappUrl } from "./utils/redirect";
import { removeSpecialCharacters } from "./utils/string";
import countries from "./json/countries.json";

function App() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [positionData, setPositionData] = useState<IPosition>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getPositionData();

        setPositionData(data);
        setCode(data.country_code_iso3);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setPositionData({} as IPosition);
      }
    })();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const phoneCode = countries.find((c) => c.iso3 === code)?.fone;

    const fullNumber = `${phoneCode}${phone}`;

    const url = getWhatsappUrl(removeSpecialCharacters(fullNumber));

    window.open(url, "_blank");

    toast.success("Boa conversa!");
  };

  return (
    <div className="App">
      <div>
        <img src={whatsLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>WhatsLink</h1>
      <div>
        <form className="card" onSubmit={onSubmit}>
          <WhatsappInput
            phone={phone}
            setPhone={setPhone}
            code={code}
            setCode={setCode}
            positionData={positionData}
          />
          <button type="submit">Abrir</button>
        </form>
      </div>
      <p className="read-the-docs">
        Inicie uma conversa no Whatsapp sem precisar salvar o contato
      </p>
    </div>
  );
}

export default App;
