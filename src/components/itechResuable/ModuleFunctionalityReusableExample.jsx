import React, { useState } from 'react';
import ModuleFunctionalityReusable from './ModuleFunctionalityReusable';

const ModuleFunctionalityReusableExample = () => {
  // State management for all form data
  const [selectedModule, setSelectedModule] = useState('');
  const [trainerRatings, setTrainerRatings] = useState({});
  const [moduleRatings, setModuleRatings] = useState({});
  const [textFields, setTextFields] = useState({
    strengths: '',
    weaknesses: '',
    suggestions: '',
    recommendation: '',
    comments: ''
  });

  // Sample modules data
  const modules = [
    { id: 1, name: 'Módulo de Matemática' },
    { id: 2, name: 'Módulo de Física' },
    { id: 3, name: 'Módulo de Química' },
    { id: 4, name: 'Módulo de Biologia' },
    { id: 5, name: 'Módulo de Português' },
    { id: 6, name: 'Módulo de História' },
    { id: 7, name: 'Módulo de Geografia' }
  ];

  // Custom trainer questions (optional - will use defaults if not provided)
  const customTrainerQuestions = [
    "O formador transmitiu com clareza os assuntos abordados?",
    "O formador conseguiu criar um clima propício à participação?",
    "O formador dominava o assunto que expôs?",
    "O formador conseguiu criar os métodos utilizados foram os mais ajustados?"
  ];

  // Custom module questions (optional - will use defaults if not provided)
  const customModuleQuestions = [
    { label: "a)", text: "Os Objectivos do curso/módulo eram claros?" },
    { label: "b)", text: "O conteúdo do curso/módulo foi adequado à função que desempenha?" },
    { label: "c)", text: "O conteúdo do curso/módulo foi adequado à função que desempenha?" },
    { label: "d)", text: "Os Textos de Apoio distribuídos foram adequados, em quantidade e qualidade?" },
    { label: "e)", text: "Os Meios audiovisuais utilizados foram adequados?" },
    { label: "f)", text: "A Duração do curso/módulo, relativamente ao seu conteúdo, foi adequada?" },
    { label: "g)", text: "As Instalações em que decorreu o curso/módulo eram adequadas?" },
    { label: "h)", text: "O apoio prestado pela técnica da DAG/Formação foi adequado?" }
  ];

  // Event handlers
  const handleModuleSelect = (module) => {
    setSelectedModule(module.name);
    console.log('Selected module:', module);
  };

  const handleTrainerRatingChange = (questionId, rating) => {
    setTrainerRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
    console.log('Trainer rating changed:', questionId, rating);
  };

  const handleModuleRatingChange = (questionId, rating) => {
    setModuleRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
    console.log('Module rating changed:', questionId, rating);
  };

  const handleTextChange = (field, value) => {
    setTextFields(prev => ({
      ...prev,
      [field]: value
    }));
    console.log('Text field changed:', field, value);
  };

  const handleSubmit = () => {
    const formData = {
      selectedModule,
      trainerRatings,
      moduleRatings,
      textFields
    };
    
    console.log('Form submitted with data:', formData);
    
    // Here you would typically send the data to your API
    // Example: await submitEvaluation(formData);
    
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ficha de Avaliação
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Com vista a melhorar o serviço prestado pela <span className="font-semibold">ICT /Formação</span>, muito gostaríamos que preenchesse
            esta Ficha de Avaliação, relativa ao Módulo em que participou.
          </p>
        </div>

        {/* Full Component Usage */}
        <ModuleFunctionalityReusable
          // Module selection props
          moduleTitle="Denominação do Módulo"
          modules={modules}
          selectedModule={selectedModule}
          onModuleSelect={handleModuleSelect}
          
          // Trainer evaluation props
          trainerQuestions={customTrainerQuestions}
          trainerRatings={trainerRatings}
          onTrainerRatingChange={handleTrainerRatingChange}
          
          // Module functioning props
          moduleQuestions={customModuleQuestions}
          moduleRatings={moduleRatings}
          onModuleRatingChange={handleModuleRatingChange}
          
          // Text areas props
          strengths={textFields.strengths}
          weaknesses={textFields.weaknesses}
          suggestions={textFields.suggestions}
          recommendation={textFields.recommendation}
          comments={textFields.comments}
          onTextChange={handleTextChange}
          
          // Form submission
          onSubmit={handleSubmit}
          submitButtonText="Enviar"
          
          // Styling props
          className="space-y-8"
          showModuleSelector={true}
          showTrainerEvaluation={true}
          showModuleFunctioning={true}
          showStrengthsWeaknesses={true}
          showSuggestions={true}
          showRecommendation={true}
          showComments={true}
          showSubmitButton={true}
        />

        {/* Alternative Usage Examples */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Alternative Usage Examples
          </h2>
          
          <div className="space-y-6">
            {/* Example 1: Only trainer evaluation */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Example 1: Only Trainer Evaluation
              </h3>
              <ModuleFunctionalityReusable
                showModuleSelector={false}
                showTrainerEvaluation={true}
                showModuleFunctioning={false}
                showStrengthsWeaknesses={false}
                showSuggestions={false}
                showRecommendation={false}
                showComments={false}
                showSubmitButton={false}
                trainerRatings={trainerRatings}
                onTrainerRatingChange={handleTrainerRatingChange}
              />
            </div>

            {/* Example 2: Only text feedback */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Example 2: Only Text Feedback
              </h3>
              <ModuleFunctionalityReusable
                showModuleSelector={false}
                showTrainerEvaluation={false}
                showModuleFunctioning={false}
                showStrengthsWeaknesses={true}
                showSuggestions={true}
                showRecommendation={true}
                showComments={true}
                showSubmitButton={true}
                strengths={textFields.strengths}
                weaknesses={textFields.weaknesses}
                suggestions={textFields.suggestions}
                recommendation={textFields.recommendation}
                comments={textFields.comments}
                onTextChange={handleTextChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleFunctionalityReusableExample;
