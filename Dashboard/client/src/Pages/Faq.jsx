import React, { useState, useEffect } from "react";
import axios from "axios";
import Statics from "./Statics";

const FAQItem = ({
  question,
  answer,
  faq_id,
  expanded,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`rounded-lg border border-t-0 border-l-0 border-r-0 border-b-0 border-neutral-200 mt-4 ${
        expanded ? "!visible" : ""
      } border shadow-lg bg-[#de9872]`}
    >
      <h2 className="mb-0" id={`flush-heading${faq_id}`}>
        <button
          className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
          type="button"
          onClick={() => onToggle(faq_id)}
        >
          {question}
          <span
            className={`ml-auto h-5 w-5 shrink-0 rotate-${
              expanded ? "180" : "0"
            } fill-[#c08261] transition-transform duration-200 ease-in-out ${
              expanded ? "rotate-180" : "" // تغيير هنا
            } ${
              expanded ? "fill-[#212529]" : ""
            } motion-reduce:transition-none dark:${
              expanded ? "fill-[#c08261]" : ""
            } dark:${expanded ? "rotate-180" : ""} dark:${
              expanded ? "fill-[#eee]" : ""
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
          <button
            className="bg-[#c08261] hover:bg-red-700 text-white font-bold py-1 px-2 border border-[#c08261] rounded ml-80 mb-10"
            onClick={() => onDelete(faq_id)}
          >
            Delete
          </button>
        </button>
      </h2>
      <div
        id={`flush-collapse${faq_id}`}
        className={`${expanded ? "!visible" : "hidden"} border-0`}
        data-te-collapse-item=""
        aria-labelledby={`flush-heading${faq_id}`}
      >
        <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300 text-left">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const toggleItem = (faq_id) => {
    setFaqData((prevData) =>
      prevData.map((item) => ({
        ...item,
        expanded: item.faq_id === faq_id ? !item.expanded : item.expanded,
      }))
    );
  };

  const deleteItem = async (faq_id) => {
    try {
      await axios.put(`http://localhost:8000/DeleteFaq/${faq_id}`);
      setFaqData((prevData) =>
        prevData.filter((item) => item.faq_id !== faq_id)
      );
    } catch (error) {
      console.error("Error deleting FAQ item:", error);
    }
  };

  const addQuestion = async () => {
    try {
      const response = await axios.post("http://localhost:8000/AddFaq", {
        question: newQuestion,
        answer: newAnswer,
        expanded: false,
      });
      const newFAQ = response.data;
      fetchFAQData();
      setFaqData((prevData) => [...prevData, newFAQ]);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding FAQ item:", error);
    }
  };

  useEffect(() => {
    fetchFAQData();
  }, []);
  const fetchFAQData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getFaq");
      setFaqData(response.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };
  return (
    <>
      <Statics />

      <div className="w-full">
        <div className="container my-24 mx-auto ms:px-6 xl:px-24">
          <section className="mb-32">
            <h2 className="mb-6 pl-6 text-3xl font-bold">
              FAQS <span className="text-[#c08261]">Questions</span>{" "}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col divflex-grow">
                <label
                  htmlFor="newQuestion"
                  className="text-lg font-semibold mb-2"
                >
                  New Question
                </label>
                <input
                  type="text"
                  id="newQuestion"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your new question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>

              <div className="flex flex-col flex-grow">
                <label
                  htmlFor="newAnswer"
                  className="text-lg font-semibold mb-2"
                >
                  New Answer
                </label>
                <input
                  type="text"
                  id="newAnswer"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your new answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </div>

              <button
                className="px-4 py-2 text-white bg-[#c08261] rounded transition duration-300 mt-9"
                onClick={addQuestion}
              >
                Add
              </button>
            </div>

            <div id="accordionFlushExample">
              {faqData.map((item) => (
                <FAQItem
                  key={item.faq_id}
                  {...item}
                  onToggle={toggleItem}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FAQ;
