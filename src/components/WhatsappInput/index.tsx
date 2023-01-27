import InputMask from "react-input-mask";
import countries from "../../json/countries.json";
import { IPosition } from "../../services/getCountry";

type Input = {
  phone: string;
  setPhone: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  positionData?: IPosition;
};

export default function WhatsappInput({
  phone,
  setPhone,
  code,
  setCode,
  positionData,
}: Input) {
  return (
    <>
      <select
        className="select"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        defaultValue={
          countries.find((c) => c.iso3 === positionData?.country_code_iso3)
            ?.iso3
        }
      >
        {countries.map((country) => (
          <option value={country.iso3} key={country.iso3}>
            {country.fone} {country.name}
          </option>
        ))}
      </select>

      {positionData?.country_code_iso3 === "BRA" ? (
        <InputMask
          mask="(99) 9 9999-9999"
          placeholder="(99) 9 9999-9999"
          type="text"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      ) : (
        <input
          placeholder="99 9 9999-9999"
          type="text"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      )}
    </>
  );
}
