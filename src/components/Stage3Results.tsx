import React, { useState } from "react";
import type { ISQ } from "../types";

interface Stage3ResultsProps {
  commonSpecs: Array<{
    spec_name: string;
    options: string[];
    category: string;
  }>;
  buyerISQs: ISQ[];
}

interface CommonSpecItem {
  spec_name: string;
  options: string[];
  category: string;
}

export default function Stage3Results({ commonSpecs, buyerISQs }: Stage3ResultsProps) {
  const [showAllBuyerISQs, setShowAllBuyerISQs] = useState(false);

  const primaryCommonSpecs = commonSpecs.filter((s) => s.category === "Primary");
  const secondaryCommonSpecs = commonSpecs.filter((s) => s.category === "Secondary");

  const displayedBuyerISQs = showAllBuyerISQs ? buyerISQs : buyerISQs.slice(0, 2);
  const hasMoreBuyerISQs = buyerISQs.length > 2;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Stage 3: Final Specifications</h2>
      <p className="text-gray-600 mb-8">
        Specifications common to both Stage 1 and Stage 2 (identified by Gemini AI)
      </p>

      {commonSpecs.length === 0 && buyerISQs.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-yellow-800">
          <p className="font-semibold">No common specifications found</p>
          <p className="text-sm mt-2">
            Gemini did not identify any specifications that appear in both Stage 1 and Stage 2.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                  <span className="inline-block w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-blue-900 text-lg font-bold">
                    {commonSpecs.length}
                  </span>
                  Common Specifications
                </h3>
                <div className="text-sm text-blue-700 font-medium">
                  {primaryCommonSpecs.length} Primary, {secondaryCommonSpecs.length} Secondary
                </div>
              </div>
              <p className="text-sm text-blue-700 mb-6">
                Specifications that appear in both Stage 1 and Stage 2
              </p>

              <div className="space-y-6">
                {primaryCommonSpecs.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-blue-700 mb-3">Primary Specs</h4>
                    <div className="space-y-4">
                      {primaryCommonSpecs.map((spec, idx) => (
                        <SpecCard key={idx} spec={spec} color="blue" />
                      ))}
                    </div>
                  </div>
                )}

                {secondaryCommonSpecs.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-3">Secondary Specs</h4>
                    <div className="space-y-4">
                      {secondaryCommonSpecs.map((spec, idx) => (
                        <SpecCard key={idx} spec={spec} color="green" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-amber-900 flex items-center gap-2">
                  <span className="inline-block w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center text-amber-900 text-lg font-bold">
                    {buyerISQs.length}
                  </span>
                  Buyer ISQs
                </h3>
                <div className="text-sm text-amber-700 font-medium">
                  Based on buyer search patterns
                </div>
              </div>
              <p className="text-sm text-amber-700 mb-6">
                Important specifications frequently searched by buyers
              </p>

              {buyerISQs.length > 0 ? (
                <div>
                  <div className="space-y-6">
                    {displayedBuyerISQs.map((spec, idx) => (
                      <BuyerISQCard key={idx} spec={spec} />
                    ))}
                  </div>

                  {hasMoreBuyerISQs && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowAllBuyerISQs(!showAllBuyerISQs)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-lg transition-colors"
                      >
                        {showAllBuyerISQs ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Show All {buyerISQs.length} Buyer ISQs
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-amber-200 p-6 rounded-lg text-center">
                  <p className="text-gray-600">No buyer ISQs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 pt-8 border-t-2 border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Common Specifications:</strong> {commonSpecs.length} specification
              {commonSpecs.length !== 1 ? "s" : ""} found across both stages.
              {primaryCommonSpecs.length > 0 && ` ${primaryCommonSpecs.length} Primary,`}
              {secondaryCommonSpecs.length > 0 && ` ${secondaryCommonSpecs.length} Secondary`}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Buyer ISQs:</strong> {buyerISQs.length} specification
              {buyerISQs.length !== 1 ? "s" : ""} based on buyer search patterns.
              {hasMoreBuyerISQs && !showAllBuyerISQs && ` Showing 2 of ${buyerISQs.length}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  spec,
  color,
}: {
  spec: CommonSpecItem;
  color: "blue" | "green" | "amber";
}) {
  const colorClasses = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", badge: "bg-blue-100" },
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", badge: "bg-green-100" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100" },
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} border ${colors.border} p-4 rounded-lg`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-lg">{spec.spec_name}</div>
          <div className="text-xs text-gray-600 mt-2">
            <span className={`inline-block ${colors.badge} px-2 py-1 rounded`}>
              {spec.category}
            </span>
            {spec.options.length === 0 && (
              <span className="inline-block ml-2 text-gray-500 text-xs">
                (No common options)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {spec.options.length > 0 ? (
          spec.options.map((option, idx) => (
            <span key={idx} className={`${colors.text} bg-white border border-current px-3 py-1 rounded-full text-sm`}>
              {option}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic text-sm">
            No common options available for this specification
          </span>
        )}
      </div>
    </div>
  );
}

function BuyerISQCard({ spec }: { spec: ISQ }) {
  return (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-lg">{spec.name}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {spec.options.length > 0 ? (
          spec.options.map((option, idx) => (
            <span key={idx} className="text-amber-800 bg-white border border-current px-3 py-1 rounded-full text-sm">
              {option}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic text-sm">
            No options available
          </span>
        )}
      </div>
    </div>
  );
}
