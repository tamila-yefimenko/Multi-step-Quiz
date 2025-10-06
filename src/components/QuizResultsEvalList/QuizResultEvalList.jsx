import { useEffect, useRef, useState } from "react";
import { client } from "../../services/algolia";
import instantsearch from "instantsearch.js";
import { hits } from "instantsearch.js/es/widgets";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { selectCurrentResult } from "../../redux/results/selectors";

function QuizResultsEvalList() {
  const hitsRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const currentResult = useSelector(selectCurrentResult);

  useEffect(() => {
    if (!hitsRef.current) return;

    const search = instantsearch({
      indexName: "quiz_results",
      searchClient: client,
      future: { preserveSharedStateOnUnmount: true },
    });

    search.addWidgets([
      hits({
        container: hitsRef.current,
        transformItems(items) {
          let sorted = items
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 10);

          if (currentResult) {
            const alreadyIncluded = sorted.some(
              (r) => r.objectID === currentResult.objectID
            );
            if (!alreadyIncluded) {
              sorted = [...sorted, currentResult]
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 10);
            }
          }

          setIsReady(true);
          return sorted.map((item, index) => ({
            ...item,
            rank: index + 1,
          }));
        },
        templates: {
          item(hit) {
            return `
              <div class="py-1 px-3 border-b text-sm flex justify-between items-center ${
                currentResult?.objectID === hit.objectID
                  ? "bg-yellow-100 font-semibold"
                  : ""
              }">
                <span>#${hit.rank} ${hit.userName}</span>
                <span>${hit.score}/${hit.totalQuestions} (${
              hit.percentage
            }%)</span>
              </div>
            `;
          },
        },
      }),
    ]);

    search.start();

    return () => search.dispose();
  }, [currentResult]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
        🏆 Топ-10
      </h2>
      {!isReady && <Loader />}
      <div
        ref={hitsRef}
        className="rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      />
    </div>
  );
}

export default QuizResultsEvalList;
