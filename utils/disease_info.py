from __future__ import annotations

from typing import Dict, List, TypedDict


class DiseaseDetails(TypedDict):
    description: str
    symptoms: List[str]
    causes: List[str]
    prevention: List[str]
    treatment: List[str]
    risk_level: str


DISEASE_DETAILS: Dict[str, DiseaseDetails] = {
    "Bacterialblight": {
        "description": "A serious bacterial disease that causes water-soaked lesions and leaf drying, often reducing yield in humid conditions.",
        "symptoms": [
            "Yellow to white lesions along leaf margins.",
            "Wilting or drying that starts from the leaf tip.",
            "Milky bacterial ooze may appear on fresh cuts in severe cases.",
        ],
        "causes": [
            "Bacterium Xanthomonas oryzae pv. oryzae.",
            "High humidity, rain splash, flooding, and strong winds.",
            "Use of infected seeds or susceptible varieties.",
        ],
        "prevention": [
            "Use certified disease-free seeds and resistant varieties.",
            "Avoid excessive nitrogen fertilizer.",
            "Improve field drainage and remove infected crop residues.",
        ],
        "treatment": [
            "Remove and destroy heavily infected plants where practical.",
            "Apply recommended copper-based bactericides as advised locally.",
            "Balance fertilizer with potassium and avoid late nitrogen application.",
        ],
        "risk_level": "High",
    },
    "Blast": {
        "description": "A fungal disease that attacks leaves, nodes, collars, and panicles, producing spindle-shaped lesions and yield loss.",
        "symptoms": [
            "Diamond or spindle-shaped gray lesions with brown borders.",
            "Neck blast can cause panicle breakage and empty grains.",
            "Seedlings may show rapid leaf spotting under humid weather.",
        ],
        "causes": [
            "Fungus Magnaporthe oryzae.",
            "High humidity, leaf wetness, cloudy weather, and dense planting.",
            "Excess nitrogen and drought stress can increase susceptibility.",
        ],
        "prevention": [
            "Plant resistant varieties suited to the region.",
            "Maintain balanced spacing and avoid dense canopy growth.",
            "Use balanced fertilization and avoid excess nitrogen.",
        ],
        "treatment": [
            "Apply recommended fungicides such as triazoles or strobilurins at early disease stages.",
            "Improve irrigation consistency to reduce plant stress.",
            "Monitor panicle initiation and booting stages closely.",
        ],
        "risk_level": "High",
    },
    "Brownspot": {
        "description": "A fungal disease associated with nutrient stress, causing brown circular spots and reduced photosynthetic leaf area.",
        "symptoms": [
            "Small oval brown spots on leaves.",
            "Dark brown margins with gray or tan centers.",
            "Poor seedling vigor and grain discoloration in severe infection.",
        ],
        "causes": [
            "Fungus Bipolaris oryzae.",
            "Poor soil fertility, especially potassium or silicon deficiency.",
            "Drought stress, poor water management, and infected seeds.",
        ],
        "prevention": [
            "Use clean seed and treat seed before sowing.",
            "Correct soil nutrient deficiencies through soil testing.",
            "Maintain proper irrigation and field sanitation.",
        ],
        "treatment": [
            "Apply suitable fungicide if disease pressure is high.",
            "Improve crop nutrition with balanced NPK and micronutrients.",
            "Remove infected residues after harvest.",
        ],
        "risk_level": "Medium",
    },
    "Healthy": {
        "description": "The uploaded leaf appears healthy, with no major visual symptoms detected by the model.",
        "symptoms": [
            "Uniform green leaf color.",
            "No visible lesions, streaks, or necrotic patches.",
            "Normal leaf structure and vigor.",
        ],
        "causes": [
            "Good crop health and balanced growing conditions.",
            "Low visible disease pressure at the time of imaging.",
        ],
        "prevention": [
            "Continue routine field scouting.",
            "Maintain balanced fertilizer, irrigation, and weed control.",
            "Use clean seed and resistant varieties in future seasons.",
        ],
        "treatment": [
            "No disease treatment is required based on this image.",
            "Keep monitoring for early symptoms, especially after rain or humidity spikes.",
            "Follow preventive integrated pest and disease management practices.",
        ],
        "risk_level": "Low",
    },
    "Sheathrot": {
        "description": "A fungal disease that affects the upper leaf sheath and can damage panicle emergence and grain quality.",
        "symptoms": [
            "Oblong or irregular lesions on the flag leaf sheath.",
            "Panicles may remain partially enclosed or emerge poorly.",
            "Whitish fungal growth may appear inside infected sheaths.",
        ],
        "causes": [
            "Fungus Sarocladium oryzae.",
            "High humidity, dense crop canopy, and insect injury.",
            "Excess nitrogen and poor air circulation.",
        ],
        "prevention": [
            "Avoid dense planting and excessive nitrogen.",
            "Control stem borers and other insects that wound plant tissue.",
            "Use resistant or tolerant varieties where available.",
        ],
        "treatment": [
            "Apply locally recommended fungicide at booting stage if symptoms appear.",
            "Improve field aeration and water management.",
            "Remove infected residues and rotate crops where possible.",
        ],
        "risk_level": "Medium",
    },
    "Tungro": {
        "description": "A viral disease transmitted by green leafhoppers, causing stunting, yellow-orange discoloration, and serious yield loss.",
        "symptoms": [
            "Yellow to orange leaf discoloration, often from the tip downward.",
            "Plant stunting and reduced tillering.",
            "Delayed flowering and poor panicle development.",
        ],
        "causes": [
            "Rice tungro bacilliform virus and rice tungro spherical virus.",
            "Spread by green leafhopper vectors.",
            "Nearby infected plants and overlapping rice crops.",
        ],
        "prevention": [
            "Use tungro-resistant varieties and synchronized planting.",
            "Remove volunteer rice plants and infected plants early.",
            "Monitor and manage green leafhopper populations.",
        ],
        "treatment": [
            "There is no direct cure for viral infection in affected plants.",
            "Rogue infected plants early to reduce spread.",
            "Use vector management only when leafhopper levels exceed local thresholds.",
        ],
        "risk_level": "High",
    },
}


def get_disease_details(disease_name: str) -> DiseaseDetails:
    """Return disease metadata, falling back to a safe generic response."""
    return DISEASE_DETAILS.get(
        disease_name,
        {
            "description": "No disease details are available for this class.",
            "symptoms": ["Not available."],
            "causes": ["Not available."],
            "prevention": ["Consult a local agriculture expert for field-specific guidance."],
            "treatment": ["Validate the model result before applying treatments."],
            "risk_level": "Unknown",
        },
    )
