import { useState } from "react";
import { toWords } from "number-to-words";
import AnswersList from "./AnswersList.jsx";

function Survey() {
  const [open, setOpen] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [formData, setFormData] = useState({
    colorRating: "",
    review: "",
    username: "",
    email: "",
    timeSpent: [],
  });
  const timeSpentArray = {
    swimming: "Swimming",
    bathing: "Bathing",
    chatting: "Chatting",
    noTime: "I don't like to spend time with it",
  };
  const radioButtons = [1, 2, 3, 4, 5]; // Used to set up radio buttons

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedTimeSpent = prevData.timeSpent.includes(value)
          ? prevData.timeSpent.filter((item) => item !== value) // Unchecking
          : [...prevData.timeSpent, value]; // Checking

        return { ...prevData, timeSpent: updatedTimeSpent };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const answerItem = {
      username: formData.username,
      colour: formData.colorRating,
      timeSpent: formData.timeSpent,
      review: formData.review,
    };

    setAnswersList([...answersList, answerItem]);

    setFormData({
      colorRating: "",
      review: "",
      username: "",
      email: "",
      timeSpent: [],
    });

    console.log("Form submitted: ", answerItem);
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {/* answers should go here */}
        <AnswersList answersList={answersList} />
      </section>
      <section className="survey__form">
        {
          /* a form should be here */
          <form className="form" onSubmit={handleSubmit}>
            <h2>Tell us what you think about your rubber duck!</h2>
            <div className="form__group radio">
              <h3>How do you rate your rubber duck colour?</h3>
              <ul>
                {radioButtons.map((number) => (
                  <li key={number}>
                    <input
                      id={`color-${toWords(number)}`}
                      type="radio"
                      name="colorRating"
                      value={number.toString()}
                      onChange={handleChange}
                      checked={formData.colorRating === number.toString()}
                    />
                    <label htmlFor={`color-${toWords(number)}`}>{number}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form__group">
              <h3>How do you like to spend time with your rubber duck?</h3>
              <ul>
                {Object.entries(timeSpentArray).map(([key, value], index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        checked={formData.timeSpent.includes(value)}
                      />
                      {value}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <label>
              <h3>What else have you got to say about your rubber duck?</h3>
              <textarea
                name="review"
                cols="30"
                rows="10"
                value={formData.review}
                onChange={handleChange}
              />
            </label>
            <label>
              Put your name here (if you feel like it):
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Leave us your email pretty please??
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <input
              className="form__submit"
              type="submit"
              value="Submit Survey!"
            />
          </form>
        }
      </section>
    </main>
  );
}

export default Survey;
