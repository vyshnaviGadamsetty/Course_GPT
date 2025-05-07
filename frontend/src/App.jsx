
// import { useState, useEffect } from 'react';
// import html2pdf from 'html2pdf.js';
// import PptxGenJS from 'pptxgenjs';
// import csTopics from './data/coursegpt_cs_topics.json'; // Adjust path if needed

// export default function CourseGPTBootstrap() {
//   const [topic, setTopic] = useState('');
//   const [lesson, setLesson] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [quiz, setQuiz] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   useEffect(() => {
//     if (loading) {
//       const interval = setInterval(() => {
//         setLoadingProgress(prev => {
//           if (prev >= 95) {
//             clearInterval(interval);
//             return 95;
//           }
//           return prev + Math.random() * 15;
//         });
//       }, 500);
//       return () => clearInterval(interval);
//     }
//   }, [loading]);

//   const handleGenerate = () => {
//     if (!topic.trim()) return;
//     setLesson('');
//     setQuiz([]);
//     setSelectedAnswers({});
//     setLoading(true);

//     setTimeout(() => {
//       const matched = csTopics.find(t =>
//         t.topic.toLowerCase().includes(topic.trim().toLowerCase())
//       );
      
//       if (matched) {
//         setLesson(generateSampleLesson(matched));
//         setQuiz(matched.quiz);
//       } else {
//         setLesson(`Sorry, no data found for "${topic}".`);
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(lesson);
//     const toastEl = document.getElementById('copyToast');
//     const toast = new window.bootstrap.Toast(toastEl);
//     toast.show();
//   };

//   const exportToPDF = () => {
//     const element = document.getElementById("lessonContent");
//     const opt = {
//       margin: 0.5,
//       filename: `${topic}_Lesson.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
//     html2pdf().set(opt).from(element).save();
//   };

//   const exportToSlides = () => {
//     const pptx = new PptxGenJS();
//     let slide = pptx.addSlide();

//     slide.addText(`${topic} - Lesson Overview`, {
//       x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '363636'
//     });

//     const sections = lesson.split('\n\n');
//     let yPos = 1.5;

//     sections.forEach(section => {
//       if (yPos > 6) {
//         slide = pptx.addSlide();
//         yPos = 0.5;
//       }
//       slide.addText(section, { x: 0.5, y: yPos, fontSize: 14, color: '5A5A5A', w: 9 });
//       yPos += 1.2;
//     });

//     pptx.writeFile(`${topic}_Lesson_Slides.pptx`);
//   };
//   const generateSampleLesson = (matched) => {
//     const { topic, overview, keyConcepts, learningObjectives, module, prerequisites } = matched;
  
//     return `# ${topic} - Comprehensive Lesson
  
//   ## Module
//   ${module || 'General'}
  
//   ## Prerequisites
//   ${(prerequisites || []).map(p => `- ${p}`).join("\n") || 'None'}
  
//   ## Overview
//   ${overview}
  
//   ## Key Concepts
//   ${keyConcepts.map((k, i) => `${i + 1}. ${k}`).join("\n")}
  
//   ## Learning Objectives
//   ${learningObjectives.map(obj => `- ${obj}`).join("\n")}
  
//   ## Further Reading
//   Explore more about ${topic} through books, research papers, and online resources.`;
//   };
  
  
//   return (
//     <div className="container py-5">
//       <div className="row mb-5">
//         <div className="col-12 text-center">
//           <h1 className="display-4 fw-bold">
//             <span className="text-primary">Course</span>
//             <span className="text-success">GPT</span>
//           </h1>
//           <p className="lead">
//             AI Assistant for Engineering Teachers, Students– Auto-generate lessons, slides & quizzes for exam prep.
//           </p>
//         </div>
//       </div>

//       <div className="row mb-4">
//         <div className="col-12">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter a topic (e.g., Quantum Computing)"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               aria-label="Topic"
//             />
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={handleGenerate}
//               disabled={loading || !topic.trim()}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Generating...
//                 </>
//               ) : 'Generate'}
//             </button>
//           </div>

//           {loading && (
//             <div className="progress mb-4" style={{ height: "8px" }}>
//               <div
//                 className="progress-bar progress-bar-striped progress-bar-animated"
//                 role="progressbar"
//                 style={{ width: `${loadingProgress}%` }}
//                 aria-valuenow={loadingProgress}
//                 aria-valuemin="0"
//                 aria-valuemax="100"
//               ></div>
//             </div>
//           )}
//         </div>
//       </div>

//       {lesson && !loading && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm">
//               <div className="card-header bg-white d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0 text-primary">{topic} Lesson Plan</h5>
//                 <div>
//                   <button className="btn btn-sm btn-outline-secondary me-2" onClick={copyToClipboard} title="Copy to clipboard">
//                     <i className="bi bi-clipboard"></i> Copy
//                   </button>
//                   <button className="btn btn-sm btn-outline-danger" onClick={() => setLesson('')} title="Close">
//                     <i className="bi bi-x-lg"></i> Close
//                   </button>
//                 </div>
//               </div>
//               <div className="card-body" id="lessonContent">
//                 <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{lesson}</pre>
//               </div>
//               <div className="card-footer bg-light">
//                 <div className="d-flex flex-wrap gap-2">
//                   <button className="btn btn-sm btn-outline-primary" onClick={exportToPDF}>
//                     <i className="bi bi-file-earmark-pdf"></i> Export PDF
//                   </button>
//                   <button className="btn btn-sm btn-outline-success" onClick={exportToSlides}>
//                     <i className="bi bi-easel"></i> Create Slides
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {!lesson && !loading && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="text-center p-5 border border-2 border-dashed rounded">
//               <div className="display-1 mb-3">📚</div>
//               <h3>Enter a topic to generate a lesson</h3>
//               <p className="text-muted">Your AI-generated lesson will appear here</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {quiz.length > 0 && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-info shadow-sm">
//               <div className="card-header bg-info text-white">Quiz on {topic}</div>
//               <div className="card-body">
//                 {quiz.map((q, idx) => (
//                   <div key={idx} className="mb-4">
//                     <h6>Q{idx + 1}. {q.question}</h6>
//                     <ul className="list-group mt-2">
//                       {q.options.map((opt, i) => {
//                         const status = selectedAnswers[idx];
//                         let className = "list-group-item";
//                         if (status) {
//                           if (opt === q.answer) className += " list-group-item-success";
//                           else if (opt === status) className += " list-group-item-danger";
//                         }
//                         return (
//                           <li
//                             key={i}
//                             className={className}
//                             onClick={() => {
//                               const correct = q.answer;
//                               setSelectedAnswers(prev => ({
//                                 ...prev,
//                                 [idx]: opt === correct ? 'correct' : opt
//                               }));
//                             }}
//                             style={{ cursor: 'pointer' }}
//                           >
//                             {opt}
//                           </li>
//                         );
//                       })}
//                       {selectedAnswers[idx] && (
//                         <div className="mt-2">
//                           {selectedAnswers[idx] === 'correct'
//                             ? '✅ Correct Answer!'
//                             : '❌ Incorrect. Try reviewing the lesson.'}
//                         </div>
//                       )}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="row mt-4">
//         <div className="col-12">
//           <div className="card bg-light">
//             <div className="card-body">
//               <h4 className="card-title">Tips for great lessons:</h4>
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item bg-transparent">Be specific with your topic for more focused content</li>
//                 <li className="list-group-item bg-transparent">Try adding a grade level</li>
//                 <li className="list-group-item bg-transparent">Include desired format (e.g., "with quiz questions")</li>
//                 <li className="list-group-item bg-transparent">Export to PDF and PPTX and enjoyy</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
//         <div id="copyToast" className="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
//           <div className="d-flex">
//             <div className="toast-body">
//               <i className="bi bi-check-circle me-2"></i>
//               Copied to clipboard!
//             </div>
//             <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
//           </div>
//         </div>
//       </div>

//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.3/font/bootstrap-icons.min.css" />
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import PptxGenJS from 'pptxgenjs';
import csTopics from './data/coursegpt_cs_topics.json'; 
import { marked } from 'marked';

export default function EnhancedCourseGPT() {
  const [topic, setTopic] = useState('');
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [pastTopics, setPastTopics] = useState([
    'Machine Learning', 
    'Data Structures', 
    'Quantum Computing', 
    'Computer Networks',
    'Artificial Intelligence'
  ]);
  const [activeTab, setActiveTab] = useState('lesson');

  // Color theme based on the palette
  const colors = {
    primary: '#22177A',
    secondary: '#605EA1',
    tertiary: '#8EA3A6',
    light: '#E6E9AF'
  };
  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLesson('');
    setQuiz([]);
    setSelectedAnswers({});
    setLoading(true);
    setLoadingProgress(0);
  
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 400);
  
    // Fetch real data after delay
    setTimeout(() => {
      const matched = csTopics.find(t =>
        t.topic.toLowerCase().includes(topic.trim().toLowerCase())
      );
  
      if (matched) {
        const {
          topic: matchedTopic,
          overview,
          keyConcepts,
          learningObjectives,
          module,
          
          quiz: realQuiz
        } = matched;
  
        const lessonText = `# ${matchedTopic} - Comprehensive Lesson
  
  ## Module
  ${module || 'General'}
  
 
  
  ## Overview
  ${overview}
  
  ## Key Concepts
  ${keyConcepts.map((k, i) => `${i + 1}. ${k}`).join('\n')}
  
  ## Learning Objectives
  ${learningObjectives.map(obj => `- ${obj}`).join('\n')}
  
  ## Further Reading
  Explore more about ${matchedTopic} through books, research papers, and online resources.`;
  
        setLesson(lessonText);
        setQuiz(realQuiz || []);
      } else {
        setLesson(`Sorry, no data found for "${topic}".`);
        setQuiz([]);
      }
  
      if (!pastTopics.includes(topic)) {
        setPastTopics(prev => [topic, ...prev].slice(0, 5));
      }
  
      setLoading(false);
    }, 2000);
  };
  
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(lesson);
    const toastEl = document.getElementById('copyToast');
    if (toastEl) {
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
    } else {
      alert('Copied to clipboard!');
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById("lessonContent");
    const opt = {
      margin: 0.5,
      filename: `${topic}_Lesson.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const exportToSlides = () => {
    const pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.addText(`${topic} - Lesson Overview`, {
      x: 0.5, y: 0.5, fontSize: 24, bold: true, color: '363636'
    });

    const sections = lesson.split('\n\n');
    let yPos = 1.5;

    sections.forEach(section => {
      if (yPos > 6) {
        slide = pptx.addSlide();
        yPos = 0.5;
      }
      slide.addText(section, { x: 0.5, y: yPos, fontSize: 14, color: '5A5A5A', w: 9 });
      yPos += 1.2;
    });

    pptx.writeFile(`${topic}_Lesson_Slides.pptx`);
  };

  const customStyles = `
    .bg-gradient-header {
      background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
      padding: 3rem 0;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .bg-gradient-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.3;
    }
    
    .bg-gradient-tips {
      background: linear-gradient(135deg, ${colors.secondary}, ${colors.primary});
      border: none;
    }
    
    .custom-card {
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: none;
      transition: all 0.3s ease;
    }
    
    .custom-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    }
    
    .input-search {
      border-radius: 100px;
      padding-left: 1.5rem;
      padding-right: 7rem;
      height: 3.5rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }
    
    .input-search:focus {
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      border-color: ${colors.secondary};
    }
    
    .btn-generate {
      border-radius: 100px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      position: absolute;
      right: 5px;
      top: 5px;
      bottom: 5px;
      z-index: 10;
    }
    
    .btn-rounded {
      border-radius: 100px;
    }
    
    .topic-pill {
      border-radius: 100px;
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      background-color: rgba(0,0,0,0.05);
      color: ${colors.primary};
      border: none;
      transition: all 0.2s ease;
    }
    
    .topic-pill:hover {
      background-color: ${colors.primary};
      color: white;
    }
    
    .custom-tab-content {
      animation: fadeIn 0.5s ease;
    }
    
    .nav-tabs .nav-link {
      border: none;
      color: #6c757d;
      position: relative;
      padding: 1rem 1.5rem;
      font-weight: 500;
    }
    
    .nav-tabs .nav-link.active {
      color: ${colors.primary};
      background: transparent;
    }
    
    .nav-tabs .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 10%;
      height: 3px;
      background-color: ${colors.primary};
      border-radius: 3px 3px 0 0;
    }
    
    .quiz-option {
      border: 2px solid #eee;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      padding-left: 2.5rem;
    }
    
    .quiz-option:hover {
      border-color: ${colors.secondary};
      background-color: rgba(96, 94, 161, 0.05);
    }
    
    .quiz-option::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 50%;
    }
    
    .quiz-option.correct {
      border-color: #28a745;
      background-color: rgba(40, 167, 69, 0.1);
    }
    
    .quiz-option.incorrect {
      border-color: #dc3545;
      background-color: rgba(220, 53, 69, 0.1);
    }
    
    .quiz-option.correct::before {
      background-color: #28a745;
      border-color: #28a745;
    }
    
    .quiz-option.incorrect::before {
      background-color: #dc3545;
      border-color: #dc3545;
    }
    
    .feature-card {
      background-color: rgba(255,255,255,0.1);
      border-radius: 1rem;
      backdrop-filter: blur(10px);
      padding: 1.5rem;
      height: 100%;
    }
    
    .feature-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-weight: bold;
      font-size: 1.2rem;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    .lesson-html-content h1 {
  color: #22177A;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #e6e9af;
  padding-bottom: 0.5rem;
}

.lesson-html-content h2 {
  color: #605EA1;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  font-weight: bold;
  border-left: 4px solid #8EA3A6;
  padding-left: 0.75rem;
}

.lesson-html-content ul,
.lesson-html-content ol {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.lesson-html-content li {
  margin-bottom: 0.25rem;
  line-height: 1.6;
}

.lesson-html-content p {
  margin-top: 1rem;
  line-height: 1.8;
}

    .pulse-animation {
      animation: pulse 2s infinite;
    }
    
    .main-content {
      background-color: #f8f9fa;
      min-height: 100vh;
      padding-bottom: 3rem;
    }
    
    .history-table tbody tr {
      transition: all 0.2s ease;
    }
    
    .history-table tbody tr:hover {
      background-color: rgba(96, 94, 161, 0.05);
    }
    
    /* Loading Animation */
    .loading-bar {
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
      background-size: 200% 200%;
      animation: gradientMove 2s ease infinite;
    }
    
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* Empty state animation */
    .empty-icon {
      animation: bounceIn 1s;
    }
    
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); opacity: 0.9; }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  // Sample data generator function
  const generateSampleData = (topicName) => {
    // This is a mock function to simulate data generation
    return {
      lesson: `# ${topicName} - Comprehensive Lesson
      
## Module
Computer Science Fundamentals

## Prerequisites
- Basic programming knowledge
- Understanding of algorithms
- Familiarity with data types

## Overview
${topicName} is a fundamental concept in computer science that deals with how computers process and store information. This lesson covers the core principles, implementation details, and practical applications in modern computing systems.

## Key Concepts
1. Algorithmic complexity
2. Data organization
3. Memory management
4. Processing techniques
5. Optimization strategies

## Learning Objectives
- Understand the fundamental principles of ${topicName}
- Implement basic ${topicName} algorithms
- Analyze the efficiency of different approaches
- Apply ${topicName} concepts to solve real-world problems
- Design optimized solutions using ${topicName} principles

## Further Reading
Explore more about ${topicName} through books, research papers, and online resources.`,
      quiz: [
        {
          question: `What is the primary purpose of ${topicName}?`,
          options: [
            'To optimize data processing',
            'To manage system memory',
            'To organize information efficiently',
            'To improve algorithm performance'
          ],
          answer: 'To organize information efficiently'
        },
        {
          question: `Which of the following is NOT a key concept in ${topicName}?`,
          options: [
            'Data structures',
            'Memory allocation',
            'Hardware acceleration',
            'Algorithm efficiency'
          ],
          answer: 'Hardware acceleration'
        },
        {
          question: `What's a common application of ${topicName} in modern systems?`,
          options: [
            'Database management',
            'Virtual reality',
            'Quantum computing',
            'Web development'
          ],
          answer: 'Database management'
        }
      ]
    };
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="main-content">
        {/* Hero Header */}
        <div className="bg-gradient-header mb-5 position-relative">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-md-10 text-center position-relative">
                <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
                  <span>Course</span>
                  <span className="text-warning">GPT</span>
                </h1>
                <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                  AI Assistant for Engineering Teachers and Students – Auto-generate comprehensive lessons, 
                  interactive slides & quizzes for exam preparation.
                </p>
              </div>
            </div>
          </div>
          <div className="wave-bottom position-absolute bottom-0 left-0 w-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
              <path fill="#f8f9fa" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
            </svg>
          </div>
        </div>

        <div className="container mb-5">
          {/* Search Input */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-10">
              <div className="custom-card bg-white mb-4">
                <div className="card-body p-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control input-search shadow-sm"
                      placeholder="Enter a topic (e.g., C Language)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      aria-label="Topic"
                    />
                    <button
                      className="btn btn-primary btn-generate"
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading || !topic.trim()}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Generating...
                        </>
                      ) : 'Generate Lesson'}
                    </button>
                  </div>

                  {/* Loading Progress */}
                  {loading && (
                    <div className="mt-4">
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar loading-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: `${loadingProgress}%` }}
                          aria-valuenow={loadingProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <small className="text-muted">Generating content...</small>
                        <small className="text-muted">{Math.round(loadingProgress)}%</small>
                      </div>
                    </div>
                  )}

                  {/* Recent Topics */}
                  <div className="mt-3">
                    <small className="text-muted d-block mb-2">
                      <i className="bi bi-clock-history me-1"></i> Recent Topics:
                    </small>
                    <div>
                      {pastTopics.map((pastTopic, idx) => (
                        <button
                          key={idx}
                          className="topic-pill"
                          onClick={() => setTopic(pastTopic)}
                        >
                          <i className="bi bi-bookmark-fill me-1"></i>
                          {pastTopic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="row justify-content-center">
            <div className="col-md-10">
              {(lesson || quiz.length > 0) && !loading ? (
                <div className="custom-card bg-white mb-4">
                  {/* Tabs */}
                  <ul className="nav nav-tabs" id="contentTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'lesson' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('lesson')}
                        type="button"
                      >
                        <i className="bi bi-book me-2"></i>Lesson
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'quiz' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('quiz')}
                        type="button"
                      >
                        <i className="bi bi-question-circle me-2"></i>Quiz
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'history' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('history')}
                        type="button"
                      >
                        <i className="bi bi-clock-history me-2"></i>History
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="tab-content p-4 custom-tab-content">
                    {/* Lesson Tab */}
                    {activeTab === 'lesson' && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h3 className="mb-0" style={{ color: colors.primary }}>
                            {topic} <span className="text-muted fs-6">Lesson Plan</span>
                          </h3>
                          <div>
                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={copyToClipboard}>
                              <i className="bi bi-clipboard me-1"></i> Copy
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => setLesson('')}>
                              <i className="bi bi-x-lg me-1"></i> Close
                            </button>
                          </div>
                        </div>
                        <div
  id="lessonContent"
  className="lesson-html-content"
  dangerouslySetInnerHTML={{ __html: marked.parse(lesson) }}
/>

                        <div className="d-flex flex-wrap gap-2 mt-4 pt-4 border-top">
                          <button className="btn btn-primary" onClick={exportToPDF}>
                            <i className="bi bi-file-earmark-pdf me-2"></i> Export PDF
                          </button>
                          <button className="btn btn-success" onClick={exportToSlides}>
                            <i className="bi bi-easel me-2"></i> Create Slides
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quiz Tab */}
                    {activeTab === 'quiz' && (
                      <div>
                        <h3 className="mb-4" style={{ color: colors.primary }}>Quiz on {topic}</h3>
                        {quiz.map((q, idx) => (
                          <div key={idx} className="mb-5">
                            <h5 className="mb-3">Question {idx + 1}: {q.question}</h5>
                            <div className="ms-2">
                              {q.options.map((opt, i) => {
                                const status = selectedAnswers[idx];
                                let className = "quiz-option";
                                
                                if (status) {
                                  if (opt === q.answer) className += " correct";
                                  else if (opt === status) className += " incorrect";
                                }
                                
                                return (
                                  <div
                                    key={i}
                                    className={className}
                                    onClick={() => {
                                      if (status) return; // Prevent changing answer
                                      const correct = q.answer;
                                      setSelectedAnswers(prev => ({
                                        ...prev,
                                        [idx]: opt === correct ? 'correct' : opt
                                      }));
                                    }}
                                  >
                                    {opt}
                                  </div>
                                );
                              })}
                              {selectedAnswers[idx] && (
                                <div className={`mt-3 p-3 rounded ${selectedAnswers[idx] === 'correct' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                                  {selectedAnswers[idx] === 'correct'
                                    ? <><i className="bi bi-check-circle me-2"></i>Correct! Well done.</>
                                    : <><i className="bi bi-x-circle me-2"></i>Incorrect. The correct answer is: {q.answer}</>}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                      <div>
                        <h3 className="mb-4" style={{ color: colors.primary }}>Topic History</h3>
                        <table className="table history-table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Topic</th>
                              <th scope="col">Date</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pastTopics.map((pastTopic, idx) => (
                              <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{pastTopic}</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td>
                                  <button 
                                    className="btn btn-sm btn-primary"
                                    onClick={() => {
                                      setTopic(pastTopic);
                                      setActiveTab('lesson');
                                      handleGenerate();
                                    }}
                                  >
                                    <i className="bi bi-arrow-repeat me-1"></i> Regenerate
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : !loading && (
                <div className="custom-card bg-white text-center py-5">
                  <div className="empty-icon mb-4">
                    <i className="bi bi-book display-1" style={{ color: colors.primary }}></i>
                  </div>
                  <h3>Enter a topic to generate a lesson</h3>
                  <p className="text-muted mb-4">Your AI-generated lesson will appear here</p>
                  <button 
                    className="btn btn-primary btn-lg pulse-animation"
                    onClick={() => document.querySelector('input').focus()}
                  >
                    <i className="bi bi-plus-circle me-2"></i> Create New Lesson
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="row justify-content-center mt-5">
            <div className="col-md-10">
              <div className="card bg-gradient-tips text-white">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4"><i className="bi bi-lightbulb me-2"></i>Tips for great lessons:</h3>
                  <div className="row g-4">
                    <div className="col-md-3">
                      <div className="feature-card">
                        <div className="feature-icon">1</div>
                        <h5>Be specific</h5>
                        <p className="mb-0">Use precise topics for more focused and useful content</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="feature-card">
                        <div className="feature-icon">2</div>
                        <h5>Add grade level</h5>
                        <p className="mb-0">Specify education level to tailor content appropriately</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="feature-card">
                        <div className="feature-icon">3</div>
                        <h5>Include format</h5>
                        <p className="mb-0">Request specific formats like quizzes or examples</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="feature-card">
                        <div className="feature-icon">4</div>
                        <h5>Export & share</h5>
                        <p className="mb-0">Save lessons as PDF or slides for future reference</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p className="mb-1">CourseGPT - Created by &copy;Gadamsetty Sri Vyshnavi</p>
            <p className="text-muted mb-0"><small>&copy; 2025 CourseGPT - All rights reserved</small></p>
          </div>
        </footer>
      </div>

      {/* Toast Notification */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div id="copyToast" className="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              <i className="bi bi-check-circle me-2"></i>
              Copied to clipboard!
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.3/font/bootstrap-icons.min.css" />
    </>
  );
}