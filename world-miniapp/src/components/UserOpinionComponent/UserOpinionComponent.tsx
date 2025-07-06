import React, { useState } from 'react'
import './UserOpinionComponent.css'

type UserOpinions = {
    opinion: string;
    valuation: number;
}

export default function UserOpinionComponent() {
    const [userOpinion, setUserOpinion] = useState<string>('');
    const [userValuation, setUserValuation] = useState<number>(3); // 0-5, default to middle
    const [otherOpinions, setOtherOpinions] = useState<UserOpinions[]>([]);

    const handleSubmit = () => {
        if (userOpinion.trim()) {
            setOtherOpinions([...otherOpinions, { opinion: userOpinion, valuation: userValuation }]);
            setUserOpinion('');
            setUserValuation(3);
        }
    }

    const getValuationLabel = (value: number) => {
        const labels = ['0 ⭐', '1 ⭐', '2 ⭐', '3 ⭐', '4 ⭐', '5 ⭐'];
        return labels[value];
    }

    const getValuationColor = (value: number) => {
        const colors = ['#ff4444', '#ff7744', '#ffaa44', '#44aa44', '#44aa77', '#44aa99'];
        return colors[value];
    }

  return (
    <div className="user-opinion-container">
        <div className="opinion-form">
            <h2>Share Your Opinion</h2>
            <div className="form-group">
                <label htmlFor="opinion-input">What's your opinion?</label>
                <textarea 
                    id="opinion-input"
                    className="opinion-input text-black"
                    value={userOpinion} 
                    onChange={(e) => setUserOpinion(e.target.value)} 
                    placeholder="Share your thoughts..."
                    rows={3}
                />
            </div>
            <div className="form-group">
                <label htmlFor="valuation-slider">
                    Rating: {getValuationLabel(userValuation)}
                </label>
                <input 
                    id="valuation-slider"
                    type="range" 
                    className="valuation-slider"
                    value={userValuation} 
                    onChange={(e) => setUserValuation(Number(e.target.value))} 
                    min={0} 
                    max={5}
                    style={{ background: `linear-gradient(to right, ${getValuationColor(userValuation)} 0%, ${getValuationColor(userValuation)} ${(userValuation / 5) * 100}%, #ddd ${(userValuation / 5) * 100}%, #ddd 100%)` }}
                />
            </div>
            <button 
                className="submit-button"
                onClick={handleSubmit}
                disabled={!userOpinion.trim()}
            >
                Submit Opinion
            </button>
        </div>
        
        <div className="opinions-list">
            <h3>Community Opinions ({otherOpinions.length})</h3>
            {otherOpinions.length === 0 ? (
                <p className="no-opinions">No opinions yet. Be the first to share!</p>
            ) : (
                <div className="opinions-grid">
                    {otherOpinions.map((opinion, index) => (
                        <div key={index} className="opinion-card">
                            <div className="opinion-content">
                                <p className="opinion-text">{opinion.opinion}</p>
                                <div className="opinion-rating">
                                    <span 
                                        className="rating-badge"
                                        style={{ backgroundColor: getValuationColor(opinion.valuation) }}
                                    >
                                        {getValuationLabel(opinion.valuation)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
