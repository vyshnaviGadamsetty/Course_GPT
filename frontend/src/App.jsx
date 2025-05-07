
import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import PptxGenJS from 'pptxgenjs';
import csTopics from './data/coursegpt_cs_topics.json'; // Adjust path if needed

export default function CourseGPTBootstrap() {
  const [topic, setTopic] = useState('');
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLesson('');
    setQuiz([]);
    setSelectedAnswers({});
    setLoading(true);

    setTimeout(() => {
      const matched = csTopics.find(t =>
        t.topic.toLowerCase().includes(topic.trim().toLowerCase())
      );
      
      if (matched) {
        setLesson(generateSampleLesson(matched));
        setQuiz(matched.quiz);
      } else {
        setLesson(`Sorry, no data found for "${topic}".`);
      }
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lesson);
    const toastEl = document.getElementById('copyToast');
    const toast = new window.bootstrap.Toast(toastEl);
    toast.show();
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
  const generateSampleLesson = (matched) => {
    const { topic, overview, keyConcepts, learningObjectives } = matched;
  
    return `# ${topic} - Comprehensive Lesson
  
  ## Overview
  ${overview}
  
  ## Key Concepts
  ${keyConcepts.map((k, i) => `${i + 1}. ${k}`).join("\n")}
  
  ## Learning Objectives
  ${learningObjectives.map(obj => `- ${obj}`).join("\n")}
  
  ## Further Reading
  Explore more about ${topic} through books, research papers, and online resources.`;
  };
  
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold">
            <span className="text-primary">Course</span>
            <span className="text-success">GPT</span>
          </h1>
          <p className="lead">
            AI Assistant for Engineering Teachers, Students– Auto-generate lessons, slides & quizzes for exam prep.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter a topic (e.g., Quantum Computing)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              aria-label="Topic"
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating...
                </>
              ) : 'Generate'}
            </button>
          </div>

          {loading && (
            <div className="progress mb-4" style={{ height: "8px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${loadingProgress}%` }}
                aria-valuenow={loadingProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
        </div>
      </div>

      {lesson && !loading && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-primary">{topic} Lesson Plan</h5>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={copyToClipboard} title="Copy to clipboard">
                    <i className="bi bi-clipboard"></i> Copy
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setLesson('')} title="Close">
                    <i className="bi bi-x-lg"></i> Close
                  </button>
                </div>
              </div>
              <div className="card-body" id="lessonContent">
                <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{lesson}</pre>
              </div>
              <div className="card-footer bg-light">
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={exportToPDF}>
                    <i className="bi bi-file-earmark-pdf"></i> Export PDF
                  </button>
                  <button className="btn btn-sm btn-outline-success" onClick={exportToSlides}>
                    <i className="bi bi-easel"></i> Create Slides
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!lesson && !loading && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="text-center p-5 border border-2 border-dashed rounded">
              <div className="display-1 mb-3">📚</div>
              <h3>Enter a topic to generate a lesson</h3>
              <p className="text-muted">Your AI-generated lesson will appear here</p>
            </div>
          </div>
        </div>
      )}

      {quiz.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-info shadow-sm">
              <div className="card-header bg-info text-white">Quiz on {topic}</div>
              <div className="card-body">
                {quiz.map((q, idx) => (
                  <div key={idx} className="mb-4">
                    <h6>Q{idx + 1}. {q.question}</h6>
                    <ul className="list-group mt-2">
                      {q.options.map((opt, i) => {
                        const status = selectedAnswers[idx];
                        let className = "list-group-item";
                        if (status) {
                          if (opt === q.answer) className += " list-group-item-success";
                          else if (opt === status) className += " list-group-item-danger";
                        }
                        return (
                          <li
                            key={i}
                            className={className}
                            onClick={() => {
                              const correct = q.answer;
                              setSelectedAnswers(prev => ({
                                ...prev,
                                [idx]: opt === correct ? 'correct' : opt
                              }));
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {opt}
                          </li>
                        );
                      })}
                      {selectedAnswers[idx] && (
                        <div className="mt-2">
                          {selectedAnswers[idx] === 'correct'
                            ? '✅ Correct Answer!'
                            : '❌ Incorrect. Try reviewing the lesson.'}
                        </div>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="card-title">Tips for great lessons:</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">Be specific with your topic for more focused content</li>
                <li className="list-group-item bg-transparent">Try adding a grade level</li>
                <li className="list-group-item bg-transparent">Include desired format (e.g., "with quiz questions")</li>
                <li className="list-group-item bg-transparent">Export to PDF and PPTX and enjoyy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
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
    </div>
  );
}
