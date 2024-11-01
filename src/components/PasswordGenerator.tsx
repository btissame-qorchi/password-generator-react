import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const PasswordGenerator = () => {
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<number>(15);
  const [password, setPassword] = useState<string>("ZTHsMVvpAnuScWL");
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  //functions
  const generatePassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = lowercase.toUpperCase();
    const numbers: string = "0123456789";
    const specialChars: string = "@!-$^+#";
    let passwordResult: string = "";

    const chars: string =
      lowercase +
      (includeUppercase ? uppercase : "") +
      (includeNumbers ? numbers : "") +
      (includeSpecialCharacters ? specialChars : "");

    for (let i = 0; i < passwordLength; i++) {
      passwordResult += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(passwordResult);
  };

  const copyPassword = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(password);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  return (
    <div className="paswwordGenerator">
      <form onSubmit={generatePassword}>
        <h1>Password Generator</h1>
        <div className="passwordOutput">
          <p>{password}</p>
          <FontAwesomeIcon icon={faCopy} onClick={copyPassword} />
          {tooltipVisible && <div className="tooltip">Password copied!</div>}
        </div>

        <div className="options">
          <label htmlFor="includeUppercase" className="customLabel">
            Uppercase (A-Z) :
            <input
              type="checkbox"
              id="includeUppercase"
              name="includeUppercase"
              checked={includeUppercase}
              onChange={() => {
                setIncludeUppercase(!includeUppercase);
              }}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="includeSpecialCharacters" className="customLabel">
            Special Characters (@!-$^+#)
            <input
              type="checkbox"
              id="includeSpecialCharacters"
              name="includeSpecialCharacters"
              checked={includeSpecialCharacters}
              onChange={() => {
                setIncludeSpecialCharacters(!includeSpecialCharacters);
              }}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="includeNumbers" className="customLabel">
            Numbers (0-9)
            <input
              type="checkbox"
              id="includeNumbers"
              name="includeNumbers"
              checked={includeNumbers}
              onChange={() => {
                setIncludeNumbers(!includeNumbers);
              }}
            />
            <span className="checkmark"></span>
          </label>
          <label htmlFor="" >
            Password Length
            <input
              type="range"
              id="passwordRange"
              name="passwordRange"
              min="5"
              max="25"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            />
            <div className="passwordLengthDisplay">
              <p>{passwordLength}</p>
            </div>
          </label>
        </div>
        <div className="actions">
          <button type="submit">
            <span>Generate Password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
