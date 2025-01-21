// import React, { useEffect, useState } from "react";
// import "./setting.css";
// import { GOOGLE_SEARCH_API } from "../../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cacheSearchResult,
//   setEmptySearchResult,
// } from "../../redux/slices/searchCacheSlice";

// const Setting = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestionList, setSuggestionList] = useState([]);
//   const [isOpenSuggestionList, setIsOpenSuggestionList] = useState(false);

//   const cacheSearch = useSelector((state) => state.searchCacheSlice);
//   API call function
//   handleFetchSearchResult = async () => {
//     const response = await fetch(GOOGLE_SEARCH_API + searchQuery);
//     const json = await response.json();
//     setSuggestionList(json[1]);

//     dispatch(
//       cacheSearchResult({
//         [searchQuery]: json[1],
//       })
//     );
//   };
//   useEffect(() => {
//     // call API
//     const timer = setTimeout(() => {
//       if (cacheSearch[searchQuery]) {
//         setSuggestionList(cacheSearch[searchQuery]);
//       } 
//       else {
//         handleFetchSearchResult();
//       }
//     }, 200);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [searchQuery]);

//   return (
//     <div className="setting-main-wrapper">
//       <div className="setting-wrapper">
//         <input
//           placeholder="Debounce search here"
//           className="setting-input"
//           onChange={(event) => setSearchQuery(event.target.value)}
//           onFocus={() => setIsOpenSuggestionList(true)}
//           onBlur={() => setIsOpenSuggestionList(false)}
//         />
//         {isOpenSuggestionList && (
//           <div className="suggestion-list">
//             <ul>
//               {suggestionList.map((suggestion) => {
//                 return (
//                   <li key={suggestion} className="suggestion-item">
//                     {suggestion}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </div>
//       <button
//         onClick={() => {
//           console.log("Called");
//           dispatch(setEmptySearchResult({}));
//         }}
//       >
//         clear all cache
//       </button>
//     </div>
//   );
// };

// export default Setting;
import React, { useEffect, useState } from "react";
import "./setting.css";
import { GOOGLE_SEARCH_API } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  cacheSearchResult,
  setEmptySearchResult,
} from "../../redux/slices/searchCacheSlice";

const Setting = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [isOpenSuggestionList, setIsOpenSuggestionList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState({
    WhatsApp: false,
    SMS: false,
  });

  const cacheSearch = useSelector((state) => state.searchCacheSlice);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cacheSearch[searchQuery]) {
        setSuggestionList(cacheSearch[searchQuery]);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleRecommendationChange = (type) => {
    setRecommendations((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="setting-main-wrapper">
      <div className="setting-wrapper">
        <input
          placeholder="Debounce search here"
          className="setting-input"
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setIsOpenSuggestionList(true)}
          onBlur={() => setIsOpenSuggestionList(false)}
        />
        {isOpenSuggestionList && (
          <div className="suggestion-list">
            <ul>
              {suggestionList.map((suggestion) => (
                <li key={suggestion} className="suggestion-item">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          console.log("Cache Cleared");
          dispatch(setEmptySearchResult({}));
        }}
      >
        Clear All Cache
      </button>

      <button
        className="delete-account-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Delete Account
      </button>

      <div className="recommendation-section">
        <h3>Recommendations & Reminders</h3>
        <div className="slider-group">
          <div className="slider-item">
            <label>WhatsApp</label>
            <div
              className={`slider ${recommendations.WhatsApp ? "active" : ""}`}
              onClick={() => handleRecommendationChange("WhatsApp")}
            >
              <div className="slider-thumb"></div>
            </div>
          </div>
          <div className="slider-item">
            <label>SMS</label>
            <div
              className={`slider ${recommendations.SMS ? "active" : ""}`}
              onClick={() => handleRecommendationChange("SMS")}
            >
              <div className="slider-thumb"></div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete your account?</p>
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>No</button>
              <button
                className="confirm-btn"
                onClick={() => {
                  alert("Account Deleted");
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;

