import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectSteps, selectAnswers } from "../../redux/quiz/selectors";

export default function ResultModal({ isOpen, onClose }) {
  const steps = useSelector(selectSteps);
  const answers = useSelector(selectAnswers);

  const getAnswerStatus = (question) => {
    const userAnswer = answers.find(
      (a) => a.questionId === question.sys.id
    )?.value;
    if (!userAnswer) return { text: "No answer", color: "text-gray-500" };
    return userAnswer.toLowerCase() ===
      question.fields.correctAnswer.toLowerCase()
      ? { text: "✔️ Correct", color: "text-green-600" }
      : { text: "❌ Incorrect", color: "text-red-600" };
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-6 pt-5 pb-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-2xl sm:w-full space-y-6">
                <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                  Detailed Results
                </Dialog.Title>

                <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
                  {steps.map((step) =>
                    step.questions.map((q) => {
                      const userAnswer = answers.find(
                        (a) => a.questionId === q.sys.id
                      )?.value;
                      const status = getAnswerStatus(q);

                      return (
                        <div
                          key={q.sys.id}
                          className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                          <p className="font-medium text-gray-800 mb-1">
                            {q.fields.questionText}
                          </p>
                          <p>
                            <strong>Your answer:</strong>{" "}
                            <span className="text-gray-700">
                              {userAnswer || "—"}
                            </span>
                          </p>
                          <p>
                            <strong>Correct answer:</strong>{" "}
                            <span className="text-gray-800">
                              {q.fields.correctAnswer}
                            </span>
                          </p>
                          <p className={`font-semibold ${status.color}`}>
                            {status.text}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="mt-3 inline-flex justify-center rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition">
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
