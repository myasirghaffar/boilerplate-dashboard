import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const ModuleFunctionalityReusable = ({
  // Module selection props
  moduleTitle = "Denominação do Módulo",
  modules = [],
  selectedModule = "",
  onModuleSelect = () => {},
  
  // Trainer evaluation props
  trainerQuestions = [],
  trainerRatings = {},
  onTrainerRatingChange = () => {},
  
  // Module functioning props
  moduleQuestions = [],
  moduleRatings = {},
  onModuleRatingChange = () => {},
  
  // Text areas props
  strengths = "",
  weaknesses = "",
  suggestions = "",
  recommendation = "",
  comments = "",
  onTextChange = () => {},
  
  // Form submission
  onSubmit = () => {},
  submitButtonText = "Enviar",
  
  // Styling props
  className = "",
  cardClassName = "",
  showModuleSelector = true,
  showTrainerEvaluation = true,
  showModuleFunctioning = true,
  showStrengthsWeaknesses = true,
  showSuggestions = true,
  showRecommendation = true,
  showComments = true,
  showSubmitButton = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Default trainer questions if none provided
  const defaultTrainerQuestions = [
    "O formador transmitiu com clareza os assuntos abordados?",
    "O formador conseguiu criar um clima propício à participação?",
    "O formador dominava o assunto que expôs?",
    "O formador conseguiu criar os métodos utilizados foram os mais ajustados?"
  ];

  // Default module questions if none provided
  const defaultModuleQuestions = [
    { label: "a)", text: "Os Objectivos do curso/módulo eram claros?" },
    { label: "b)", text: "O conteúdo do curso/módulo foi adequado à função que desempenha?" },
    { label: "c)", text: "O conteúdo do curso/módulo foi adequado à função que desempenha?" },
    { label: "d)", text: "Os Textos de Apoio distribuídos foram adequados, em quantidade e qualidade?" },
    { label: "e)", text: "Os Meios audiovisuais utilizados foram adequados?" },
    { label: "f)", text: "A Duração do curso/módulo, relativamente ao seu conteúdo, foi adequada?" },
    { label: "g)", text: "As Instalações em que decorreu o curso/módulo eram adequadas?" },
    { label: "h)", text: "O apoio prestado pela técnica da DAG/Formação foi adequado?" }
  ];

  const finalTrainerQuestions = trainerQuestions.length > 0 ? trainerQuestions : defaultTrainerQuestions;
  const finalModuleQuestions = moduleQuestions.length > 0 ? moduleQuestions : defaultModuleQuestions;

  // Rating Scale Component (without individual card wrapper)
  const RatingScale = ({ questionId, rating, onChange, questionText, label = "" }) => (
    <div className="mb-4 sm:mb-6">
      <div className="mb-3 sm:mb-4">
        <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
          {label && <span className="font-medium">{label} </span>}
          {questionText}
        </p>
      </div>
      <div className="flex gap-1 sm:gap-2 justify-center sm:justify-start">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onChange(questionId, value)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              rating === value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );

  // Text Area Component
  const TextArea = ({ label, value, onChange, placeholder, rows = 2 }) => (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 w-full">
      <div className="mb-3 sm:mb-4">
        <label className="text-gray-800 font-medium text-xs sm:text-sm">{label}</label>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
        style={{ 
          background: 'white',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.06)'
        }}
      />
    </div>
  );

  // Dual Text Area Component (for strengths/weaknesses)
  const DualTextArea = ({ leftLabel, rightLabel, leftValue, rightValue, onLeftChange, onRightChange, leftPlaceholder, rightPlaceholder }) => (
    <div className="w-full">
      <div className="mb-3 sm:mb-4">
        <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg text-left" style={{ fontWeight: 600 }}>
          Na sua opinião, quais os principais "pontos fortes" e "pontos fracos" deste curso/módulo?
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <div className="mb-2">
            <label className="text-gray-800 font-medium text-xs sm:text-sm">{leftLabel}</label>
          </div>
          <textarea
            value={leftValue}
            onChange={(e) => onLeftChange(e.target.value)}
            placeholder={leftPlaceholder}
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            style={{ 
              background: 'white',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          />
        </div>
        <div>
          <div className="mb-2">
            <label className="text-gray-800 font-medium text-xs sm:text-sm">{rightLabel}</label>
          </div>
          <textarea
            value={rightValue}
            onChange={(e) => onRightChange(e.target.value)}
            placeholder={rightPlaceholder}
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            style={{ 
              background: 'white',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          />
        </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Module Selection */}
      {showModuleSelector && (
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 w-full">
          <div className="mb-3 sm:mb-4">
            <label className="text-gray-800 font-medium text-xs sm:text-sm">{moduleTitle}</label>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-md px-2 sm:px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner text-xs sm:text-sm"
            >
              <span className={selectedModule ? 'text-gray-800' : 'text-gray-400'}>
                {selectedModule || 'Módulo'}
              </span>
              <ChevronDown 
                className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 sm:max-h-60 overflow-auto">
                {modules.map((module, index) => (
                  <button
                    key={module.id || index}
                    onClick={() => {
                      onModuleSelect(module);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-2 sm:px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-800 text-xs sm:text-sm"
                  >
                    {module.name || module}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trainer Evaluation Section */}
      {showTrainerEvaluation && (
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Avaliação do Formador</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {finalTrainerQuestions.map((question, index) => (
              <RatingScale
                key={index}
                questionId={`trainer_${index}`}
                questionText={question}
                rating={trainerRatings[`trainer_${index}`] || 0}
                onChange={onTrainerRatingChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Module Functioning Section */}
      {showModuleFunctioning && (
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Funcionamento do Módulo</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-4">
            {finalModuleQuestions.map((question, index) => (
              <RatingScale
                key={index}
                questionId={`module_${index}`}
                questionText={question.text}
                label={question.label}
                rating={moduleRatings[`module_${index}`] || 0}
                onChange={onModuleRatingChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Strengths and Weaknesses */}
      {showStrengthsWeaknesses && (
        <DualTextArea
          leftLabel="Pontos fortes"
          rightLabel="Pontos fracos"
          leftValue={strengths}
          rightValue={weaknesses}
          onLeftChange={(value) => onTextChange('strengths', value)}
          onRightChange={(value) => onTextChange('weaknesses', value)}
          leftPlaceholder="Pontos fortes"
          rightPlaceholder="Pontos fracos"
        />
      )}

      {/* Suggestions */}
      {showSuggestions && (
        <TextArea
          label="Que sugestões de melhoria gostaria de fazer?"
          value={suggestions}
          onChange={(value) => onTextChange('suggestions', value)}
          placeholder=""
        />
      )}

      {/* Recommendation */}
      {showRecommendation && (
        <TextArea
          label="Aconselharia outra pessoa a fazer este Módulo? SIM OU NÃO porquê?"
          value={recommendation}
          onChange={(value) => onTextChange('recommendation', value)}
          placeholder=""
        />
      )}

      {/* Comments */}
      {showComments && (
        <TextArea
          label="Comentários"
          value={comments}
          onChange={(value) => onTextChange('comments', value)}
          placeholder="Comentários"
        />
      )}

      {/* Submit Button */} 
      {showSubmitButton && (
        <div className="flex justify-start">
          <button
            onClick={onSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 sm:py-4 sm:px-8 md:px-10 rounded-full transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            {submitButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ModuleFunctionalityReusable;
