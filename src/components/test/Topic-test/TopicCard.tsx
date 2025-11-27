// // components/TopicCard/TopicCard.tsx
// import React, { useState } from "react";
// import "./TopicCard.css";
// import type { Topic } from "../../types";
// import { apiService } from "../../services/apiService";
// import QuestionForm from "../Forms/QuestionForm";
// import MaterialForm from "../Forms/MaterialForm";
// import TopicForm from "../Forms/TopicForm";
// import MaterialsList from "../Material-test/MaterialsList";
// import QuestionsList from "../Question/QuestionsList";
// import ConfirmModal from "../Modal/ConfirmModal";

// interface TopicCardProps {
//   topic: Topic;
//   onContentCreated: () => void;
//   onTopicUpdated: () => void;
//   canEdit: boolean;
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   topic,
//   onContentCreated,
//   onTopicUpdated,
//   canEdit,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState<"questions" | "materials">(
//     "questions"
//   );
//   const [showQuestionForm, setShowQuestionForm] = useState(false);
//   const [showMaterialForm, setShowMaterialForm] = useState(false);
//   const [showTopicForm, setShowTopicForm] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const getDifficultyText = (level: number) => {
//     switch (level) {
//       case 1:
//         return "Beginner";
//       case 2:
//         return "Intermediate";
//       case 3:
//         return "Advanced";
//       default:
//         return "Not specified";
//     }
//   };

//   const getDifficultyColor = (level: number) => {
//     switch (level) {
//       case 1:
//         return "#10b981";
//       case 2:
//         return "#f59e0b";
//       case 3:
//         return "#ef4444";
//       default:
//         return "#6b7280";
//     }
//   };

//   const handleEditTopic = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowTopicForm(true);
//   };

//   const handleDeleteClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowDeleteConfirm(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await apiService.deleteTopic(topic.topicId!);
//       onTopicUpdated();
//     } catch (error) {
//       console.error("Error deleting topic:", error);
//       // Có thể thêm toast notification ở đây
//       alert("Failed to delete topic");
//     }
//   };

//   const handleQuestionCreated = () => {
//     setShowQuestionForm(false);
//     onContentCreated();
//   };

//   const handleMaterialCreated = () => {
//     setShowMaterialForm(false);
//     onContentCreated();
//   };

//   const handleTopicUpdated = () => {
//     setShowTopicForm(false);
//     onTopicUpdated();
//   };

//   return (
//     <div className="topic-card">
//       <div
//         className="topic-card-header"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <div className="topic-info">
//           <h3 className="topic-name">{topic.name}</h3>
//           {topic.description && (
//             <p className="topic-description">{topic.description}</p>
//           )}
//           <div className="topic-meta">
//             {topic.difficultyLevel && (
//               <div
//                 className="difficulty-badge"
//                 style={{
//                   backgroundColor: getDifficultyColor(topic.difficultyLevel),
//                 }}
//               >
//                 {getDifficultyText(topic.difficultyLevel)}
//               </div>
//             )}
//             <div className="topic-stats-header">
//               <span className="stat-item">
//                 <span className="material-icons">quiz</span>
//                 {topic.questions?.length || 0} Questions
//               </span>
//               <span className="stat-item">
//                 <span className="material-icons">description</span>
//                 {topic.learningMaterials?.length || 0} Materials
//               </span>
//             </div>
//             {canEdit && (
//               <div className="topic-header-actions">
//                 <button
//                   className="icon-btn edit-btn"
//                   onClick={handleEditTopic}
//                   title="Edit topic"
//                 >
//                   <span className="material-icons">edit</span>
//                   Edit
//                 </button>
//                 <button
//                   className="icon-btn delete-btn"
//                   onClick={handleDeleteClick}
//                   title="Delete topic"
//                 >
//                   <span className="material-icons">delete</span>
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="topic-actions">
//           <button
//             className="expand-btn"
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsExpanded(!isExpanded);
//             }}
//           >
//             <span className="material-icons">
//               {isExpanded ? "expand_less" : "expand_more"}
//             </span>
//           </button>
//           {canEdit && (
//             <>
//               <button
//                 className="add-question-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowQuestionForm(true);
//                 }}
//               >
//                 <span className="material-icons">add</span>
//                 Add Question
//               </button>
//               <button
//                 className="add-material-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowMaterialForm(true);
//                 }}
//               >
//                 <span className="material-icons">add</span>
//                 Add Material
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="topic-content">
//           <div className="topic-tabs">
//             <button
//               className={`tab-btn ${activeTab === "questions" ? "active" : ""}`}
//               onClick={() => setActiveTab("questions")}
//             >
//               <span className="material-icons">quiz</span>
//               Questions ({topic.questions?.length || 0})
//             </button>
//             <button
//               className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
//               onClick={() => setActiveTab("materials")}
//             >
//               <span className="material-icons">description</span>
//               Materials ({topic.learningMaterials?.length || 0})
//             </button>
//           </div>

//           <div className="tab-content">
//             {activeTab === "questions" ? (
//               <div className="questions-section">
//                 <h4 className="section-title">Questions</h4>
//                 <QuestionsList
//                   questions={topic.questions || []}
//                   canEdit={canEdit}
//                   onContentCreated={onContentCreated}
//                   emptyStateMessage={
//                     canEdit
//                       ? "No questions yet. Add your first question!"
//                       : "No questions available"
//                   }
//                 />
//               </div>
//             ) : (
//               <div className="materials-section">
//                 <h4 className="section-title">Learning Materials</h4>
//                 <MaterialsList
//                   materials={topic.learningMaterials || []}
//                   canEdit={canEdit}
//                   onContentCreated={onContentCreated}
//                   emptyStateMessage={
//                     canEdit
//                       ? "No materials yet. Add your first material!"
//                       : "No materials available"
//                   }
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Forms Modals */}
//       {canEdit && (
//         <>
//           <QuestionForm
//             isOpen={showQuestionForm}
//             onClose={() => setShowQuestionForm(false)}
//             onQuestionCreated={handleQuestionCreated}
//             defaultTopicId={topic.topicId!}
//           />

//           <MaterialForm
//             isOpen={showMaterialForm}
//             onClose={() => setShowMaterialForm(false)}
//             onMaterialCreated={handleMaterialCreated}
//             defaultTopicId={topic.topicId!}
//           />

//           <TopicForm
//             isOpen={showTopicForm}
//             onClose={() => setShowTopicForm(false)}
//             onTopicCreated={handleTopicUpdated}
//             defaultSubjectId={topic.subjectId!}
//             editingTopic={topic}
//           />

//           <ConfirmModal
//             isOpen={showDeleteConfirm}
//             onClose={() => setShowDeleteConfirm(false)}
//             onConfirm={handleDeleteConfirm}
//             title="Delete Topic"
//             message={`Are you sure you want to delete "${topic.name}"? This action cannot be undone and will also delete all questions and materials in this topic.`}
//             confirmText="Delete"
//             type="danger"
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default TopicCard;
