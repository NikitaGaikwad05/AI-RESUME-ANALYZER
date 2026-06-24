// ==========================================
// AI RESUME ANALYZER - ADVANCED
// Complete JavaScript Implementation
// ==========================================

// ==== CONFIGURATION ====
const CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    SUPPORTED_FORMATS: ['.pdf', '.docx', '.txt'],
    SKILLS_DATABASE: {
        frontend: ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Next.js', 'Svelte', 'Tailwind'],
        backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Java', 'Python', 'PHP', 'Ruby', 'Go'],
        database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Oracle', 'SQL Server', 'DynamoDB'],
        devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins', 'GitLab', 'GitHub Actions'],
        tools: ['Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'VS Code', 'Linux', 'Terminal', 'API', 'REST'],
        methodologies: ['Agile', 'Scrum', 'Waterfall', 'TDD', 'OOP', 'Microservices', 'MVC', 'Design Patterns']
    },
    IMPORTANT_KEYWORDS: {
        'Senior Full Stack Developer': ['full stack', 'frontend', 'backend', 'react', 'node.js', 'database', 'api', 'rest', 'git'],
        'Data Scientist': ['python', 'machine learning', 'data analysis', 'sql', 'tableau', 'statistics', 'tensorflow', 'scikit-learn'],
        'DevOps Engineer': ['docker', 'kubernetes', 'ci/cd', 'aws', 'azure', 'git', 'terraform', 'jenkins'],
        'Android Developer': ['android', 'kotlin', 'java', 'firebase', 'api', 'rest', 'xml', 'gradle'],
        'iOS Developer': ['ios', 'swift', 'objective-c', 'xcode', 'cocoapods', 'api', 'rest'],
        'QA Engineer': ['testing', 'selenium', 'jest', 'automation', 'bug tracking', 'test cases', 'quality assurance']
    }
};

// ==== DOM ELEMENTS ====
const elements = {
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    fileBadge: document.getElementById('fileBadge'),
    jobRole: document.getElementById('jobRole'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    scoreCard: document.getElementById('scoreCard'),
    scoreValue: document.getElementById('scoreValue'),
    scoreTitle: document.getElementById('scoreTitle'),
    scoreDescription: document.getElementById('scoreDescription'),
    scoreGrade: document.getElementById('scoreGrade'),
    previewCard: document.getElementById('previewCard'),
    previewBox: document.getElementById('previewBox'),
    skillsGrid: document.getElementById('skillsGrid'),
    detectedSkills: document.getElementById('detectedSkills'),
    missingSkills: document.getElementById('missingSkills'),
    atsCard: document.getElementById('atsCard'),
    keywordBar: document.getElementById('keywordBar'),
    keywordPercent: document.getElementById('keywordPercent'),
    formattingBar: document.getElementById('formattingBar'),
    formattingPercent: document.getElementById('formattingPercent'),
    structureBar: document.getElementById('structureBar'),
    structurePercent: document.getElementById('structurePercent'),
    lengthBar: document.getElementById('lengthBar'),
    lengthPercent: document.getElementById('lengthPercent'),
    recommendationsCard: document.getElementById('recommendationsCard'),
    recommendationsList: document.getElementById('recommendationsList'),
    keywordsCard: document.getElementById('keywordsCard'),
    foundKeywords: document.getElementById('foundKeywords'),
    suggestedKeywords: document.getElementById('suggestedKeywords'),
    downloadBtn: document.getElementById('downloadBtn'),
    resetBtn: document.getElementById('resetBtn'),
    actionButtons: document.getElementById('actionButtons')
};

// ==== GLOBAL STATE ====
let currentResumeData = {
    text: '',
    file: null,
    jobRole: '',
    analysis: null
};

// ==== EVENT LISTENERS ====
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    setupFileUpload();
    setupFormInputs();
    setupButtons();
}

// ==========================================
// FILE UPLOAD FUNCTIONALITY
// ==========================================

function setupFileUpload() {
    elements.uploadZone.addEventListener('click', () => elements.fileInput.click());
    
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    elements.uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.add('dragover');
    });
    
    elements.uploadZone.addEventListener('dragleave', () => {
        elements.uploadZone.classList.remove('dragover');
    });
    
    elements.uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Validate file
    if (file.size > CONFIG.MAX_FILE_SIZE) {
        alert('File size exceeds 5MB limit');
        return;
    }
    
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!CONFIG.SUPPORTED_FORMATS.includes(fileExt)) {
        alert('Unsupported file format. Please upload PDF, DOCX, or TXT');
        return;
    }
    
    currentResumeData.file = file;
    elements.fileBadge.textContent = `✓ ${file.name}`;
    elements.fileBadge.style.display = 'block';
    elements.analyzeBtn.disabled = false;
    
    // Read file content
    readFileContent(file);
}

function readFileContent(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        if (file.name.endsWith('.txt')) {
            currentResumeData.text = e.target.result;
        } else {
            // For PDF and DOCX, we'll simulate text extraction
            currentResumeData.text = extractTextFromFile(e.target.result, file.name);
        }
    };
    
    reader.readAsText(file, 'UTF-8');
}

function extractTextFromFile(content, filename) {
    // Simulated text extraction for PDF and DOCX
    // In production, use libraries like pdfjs or docx-parser
    if (filename.endsWith('.pdf') || filename.endsWith('.docx')) {
        return `[Resume content from ${filename}]\n\n` + 
               `John Doe\nSenior Full Stack Developer\n\n` +
               `PROFESSIONAL SUMMARY\nExperienced developer with 5+ years in full-stack development.\n\n` +
               `SKILLS\nReact, Node.js, JavaScript, Python, MongoDB, PostgreSQL, Docker, AWS, Git, REST API\n\n` +
               `EXPERIENCE\nLead Frontend Developer at Tech Company (2022-Present)\n` +
               `Developed and maintained React applications serving 100k+ users.\n` +
               `Implemented CI/CD pipelines using GitHub Actions and Docker.\n\n` +
               `EDUCATION\nBachelor of Science in Computer Science`;
    }
    return content;
}

// ==========================================
// FORM INPUTS
// ==========================================

function setupFormInputs() {
    elements.jobRole.addEventListener('change', updateAnalyzeButtonState);
    elements.jobRole.addEventListener('keyup', updateAnalyzeButtonState);
}

function updateAnalyzeButtonState() {
    const hasFile = currentResumeData.file !== null;
    const hasJobRole = elements.jobRole.value.trim().length > 0;
    elements.analyzeBtn.disabled = !(hasFile && hasJobRole);
}

// ==========================================
// BUTTON HANDLERS
// ==========================================

function setupButtons() {
    elements.analyzeBtn.addEventListener('click', analyzeResume);
    elements.downloadBtn.addEventListener('click', downloadReport);
    elements.resetBtn.addEventListener('click', resetAnalysis);
}

async function analyzeResume() {
    currentResumeData.jobRole = elements.jobRole.value.trim();
    
    // Show loading
    elements.loadingSpinner.style.display = 'block';
    hideAllResults();
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Perform analysis
    currentResumeData.analysis = performAnalysis(
        currentResumeData.text,
        currentResumeData.jobRole
    );
    
    // Hide loading
    elements.loadingSpinner.style.display = 'none';
    
    // Display results
    displayResults();
}

// ==========================================
// ANALYSIS ENGINE
// ==========================================

function performAnalysis(resumeText, jobRole) {
    const textLower = resumeText.toLowerCase();
    
    // 1. Extract detected skills
    const detectedSkillsList = extractDetectedSkills(textLower);
    
    // 2. Find missing skills based on job role
    const missingSkillsList = findMissingSkills(jobRole, detectedSkillsList);
    
    // 3. Get important keywords
    const jobKeywords = getJobKeywords(jobRole);
    const foundKeywords = jobKeywords.filter(kw => textLower.includes(kw.toLowerCase()));
    const suggestedKeywords = jobKeywords.filter(kw => !textLower.includes(kw.toLowerCase()));
    
    // 4. Calculate ATS score components
    const keywordScore = calculateKeywordScore(textLower, jobRole, foundKeywords);
    const formattingScore = calculateFormattingScore(resumeText);
    const structureScore = calculateStructureScore(resumeText);
    const lengthScore = calculateLengthScore(resumeText);
    
    // 5. Calculate overall score
    const overallScore = Math.round(
        (keywordScore * 0.4 + formattingScore * 0.25 + structureScore * 0.2 + lengthScore * 0.15)
    );
    
    // 6. Generate recommendations
    const recommendations = generateRecommendations(
        textLower,
        jobRole,
        detectedSkillsList,
        missingSkillsList,
        foundKeywords
    );
    
    return {
        overallScore,
        keywordScore,
        formattingScore,
        structureScore,
        lengthScore,
        detectedSkills: detectedSkillsList,
        missingSkills: missingSkillsList,
        foundKeywords,
        suggestedKeywords,
        recommendations,
        resumeText
    };
}

function extractDetectedSkills(textLower) {
    const allSkills = Object.values(CONFIG.SKILLS_DATABASE).flat();
    return allSkills.filter(skill => textLower.includes(skill.toLowerCase()));
}

function findMissingSkills(jobRole, detectedSkills) {
    const jobKeywords = getJobKeywords(jobRole);
    return jobKeywords.filter(kw => !detectedSkills.includes(kw));
}

function getJobKeywords(jobRole) {
    const lowerRole = jobRole.toLowerCase();
    
    // Try to find exact match in IMPORTANT_KEYWORDS
    for (const [role, keywords] of Object.entries(CONFIG.IMPORTANT_KEYWORDS)) {
        if (lowerRole.includes(role.toLowerCase())) {
            return keywords;
        }
    }
    
    // Return general tech skills if no match found
    return Object.values(CONFIG.SKILLS_DATABASE).flat().slice(0, 15);
}

function calculateKeywordScore(textLower, jobRole, foundKeywords) {
    const jobKeywords = getJobKeywords(jobRole);
    return Math.round((foundKeywords.length / jobKeywords.length) * 100);
}

function calculateFormattingScore(resumeText) {
    let score = 100;
    
    // Deduct points for common formatting issues
    if (!resumeText.includes('@') && !resumeText.includes('email')) score -= 10;
    if (!resumeText.includes('+') && !resumeText.includes('phone')) score -= 5;
    if (resumeText.length < 500) score -= 15; // Too short
    if (resumeText.includes('•') || resumeText.includes('-')) {
        score += 5; // Has bullet points
    }
    
    return Math.min(100, Math.max(0, score));
}

function calculateStructureScore(resumeText) {
    let score = 60;
    const text = resumeText.toLowerCase();
    const sections = ['summary', 'experience', 'skills', 'education', 'projects'];
    
    sections.forEach(section => {
        if (text.includes(section)) score += 8;
    });
    
    return Math.min(100, score);
}

function calculateLengthScore(resumeText) {
    const length = resumeText.length;
    
    if (length < 500) return 40;
    if (length < 1000) return 70;
    if (length < 2000) return 95;
    if (length < 3000) return 100;
    return 90; // Too long
}

function generateRecommendations(textLower, jobRole, detectedSkills, missingSkills, foundKeywords) {
    const recommendations = [];
    
    // Missing skills recommendation
    if (missingSkills.length > 0) {
        recommendations.push({
            icon: '📚',
            text: `Add these in-demand skills: ${missingSkills.slice(0, 3).join(', ')}`
        });
    }
    
    // Length recommendation
    if (textLower.length < 1000) {
        recommendations.push({
            icon: '📝',
            text: 'Expand your resume with more details about your accomplishments and projects'
        });
    }
    
    // Achievement recommendation
    if (!textLower.match(/\d+%|\d+\+|increased|improved|reduced|achieved/gi)) {
        recommendations.push({
            icon: '📈',
            text: 'Add quantifiable achievements with numbers and percentages'
        });
    }
    
    // ATS optimization
    if (foundKeywords.length < getJobKeywords(jobRole).length * 0.6) {
        recommendations.push({
            icon: '🎯',
            text: 'Include more relevant keywords related to your target job role'
        });
    }
    
    // Format recommendation
    if (!textLower.includes('linkedin') && !textLower.includes('github')) {
        recommendations.push({
            icon: '🔗',
            text: 'Add LinkedIn profile URL and GitHub link to strengthen your profile'
        });
    }
    
    // Customization recommendation
    recommendations.push({
        icon: '✨',
        text: 'Tailor your resume for each job application to match specific requirements'
    });
    
    return recommendations;
}

// ==========================================
// RESULT DISPLAY
// ==========================================

function displayResults() {
    const analysis = currentResumeData.analysis;
    
    // Display preview
    displayPreview();
    
    // Display score
    displayScore(analysis.overallScore);
    
    // Display skills with counts
    displaySkillsWithCounts(analysis.detectedSkills, analysis.missingSkills);
    
    // Display ATS breakdown
    displayATSBreakdown(analysis);
    
    // Display recommendations
    displayRecommendations(analysis.recommendations);
    
    // Display keyword analysis with counts
    displayKeywordAnalysisWithCounts(analysis.foundKeywords, analysis.suggestedKeywords);
    
    // Show action buttons
    elements.actionButtons.style.display = 'flex';
}

function displayPreview() {
    const preview = currentResumeData.analysis.resumeText;
    const displayText = preview.substring(0, 500) + (preview.length > 500 ? '...' : '');
    elements.previewBox.textContent = displayText;
    elements.previewCard.style.display = 'block';
}

function displayScore(score) {
    const gradeLetters = ['F', 'D', 'C', 'B', 'A'];
    const gradeIndex = Math.floor(score / 20);
    const grade = gradeLetters[Math.min(gradeIndex, 4)];
    
    const titles = {
        'A': 'Excellent ATS Compatibility',
        'B': 'Good ATS Compatibility',
        'C': 'Fair ATS Compatibility',
        'D': 'Needs Improvement',
        'F': 'Poor ATS Compatibility'
    };
    
    const descriptions = {
        'A': 'Your resume is well-optimized and contains most required keywords for the role.',
        'B': 'Your resume is good but could use some optimization.',
        'C': 'Your resume needs some work to improve ATS compatibility.',
        'D': 'Your resume needs significant improvements to be ATS-friendly.',
        'F': 'Your resume requires major revisions to be ATS-compatible.'
    };
    
    // Animate score
    animateProgressRing(score);
    
    elements.scoreValue.textContent = score;
    elements.scoreTitle.textContent = titles[grade];
    elements.scoreDescription.textContent = descriptions[grade];
    elements.scoreGrade.textContent = `Grade ${grade}`;
    elements.scoreCard.style.display = 'flex';
}

function animateProgressRing(score) {
    const circle = document.querySelector('.progress-ring__circle');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

function displaySkills(detected, missing) {
    // Display detected skills
    if (detected.length > 0) {
        elements.detectedSkills.innerHTML = detected
            .map(skill => `<div class="tag tag-found">${skill}</div>`)
            .join('');
    }
    
    // Display missing skills
    if (missing.length > 0) {
        elements.missingSkills.innerHTML = missing
            .map(skill => `<div class="tag tag-missing">${skill}</div>`)
            .join('');
    } else {
        elements.missingSkills.innerHTML = '<p class="empty-state">Great! You have all the key skills.</p>';
    }
    
    elements.skillsGrid.style.display = 'grid';
}

function displayATSBreakdown(analysis) {
    updateProgress(elements.keywordBar, elements.keywordPercent, analysis.keywordScore);
    updateProgress(elements.formattingBar, elements.formattingPercent, analysis.formattingScore);
    updateProgress(elements.structureBar, elements.structurePercent, analysis.structureScore);
    updateProgress(elements.lengthBar, elements.lengthPercent, analysis.lengthScore);
    
    elements.atsCard.style.display = 'block';
}

function updateProgress(bar, percentElement, value) {
    bar.style.width = value + '%';
    percentElement.textContent = value + '%';
}

function displayRecommendations(recommendations) {
    if (recommendations.length > 0) {
        elements.recommendationsList.innerHTML = recommendations
            .map(rec => `
                <div class="recommendation">
                    <div class="recommendation-icon">${rec.icon}</div>
                    <div>${rec.text}</div>
                </div>
            `)
            .join('');
    }
    
    elements.recommendationsCard.style.display = 'block';
}

function displayKeywordAnalysis(found, suggested) {
    if (found.length > 0) {
        elements.foundKeywords.innerHTML = found
            .map(kw => `<div class="tag tag-found">${kw}</div>`)
            .join('');
    }
    
    if (suggested.length > 0) {
        elements.suggestedKeywords.innerHTML = suggested
            .slice(0, 8)
            .map(kw => `<div class="tag tag-missing">${kw}</div>`)
            .join('');
    } else {
        elements.suggestedKeywords.innerHTML = '<p class="empty-state">All key keywords found!</p>';
    }
    
    elements.keywordsCard.style.display = 'block';
}

function hideAllResults() {
    elements.scoreCard.style.display = 'none';
    elements.previewCard.style.display = 'none';
    elements.skillsGrid.style.display = 'none';
    elements.atsCard.style.display = 'none';
    elements.recommendationsCard.style.display = 'none';
    elements.keywordsCard.style.display = 'none';
    elements.actionButtons.style.display = 'none';
}

// ==========================================
// DOWNLOAD REPORT
// ==========================================

function downloadReport() {
    const analysis = currentResumeData.analysis;
    const jobRole = currentResumeData.jobRole;
    
    let reportContent = `
AI RESUME ANALYZER REPORT
==================================
Generated: ${new Date().toLocaleDateString()}

JOB ROLE: ${jobRole}

OVERALL ATS SCORE: ${analysis.overallScore}/100

BREAKDOWN:
- Keyword Match: ${analysis.keywordScore}%
- Formatting Quality: ${analysis.formattingScore}%
- Section Structure: ${analysis.structureScore}%
- Length & Readability: ${analysis.lengthScore}%

DETECTED SKILLS (${analysis.detectedSkills.length}):
${analysis.detectedSkills.join(', ')}

MISSING SKILLS (${analysis.missingSkills.length}):
${analysis.missingSkills.length > 0 ? analysis.missingSkills.join(', ') : 'None'}

IMPORTANT KEYWORDS FOUND:
${analysis.foundKeywords.join(', ')}

RECOMMENDED KEYWORDS TO ADD:
${analysis.suggestedKeywords.slice(0, 10).join(', ')}

RECOMMENDATIONS:
${analysis.recommendations.map(r => `• ${r.text}`).join('\n')}

==================================
${new Date().toLocaleString()}
`;
    
    downloadAsFile(reportContent, 'resume_analysis_report.txt');
}

function downloadAsFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// ==========================================
// RESET
// ==========================================

function resetAnalysis() {
    currentResumeData = {
        text: '',
        file: null,
        jobRole: '',
        analysis: null
    };
    
    elements.fileInput.value = '';
    elements.fileBadge.style.display = 'none';
    elements.jobRole.value = '';
    elements.analyzeBtn.disabled = true;
    
    hideAllResults();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// ADVANCED FEATURES - DARK MODE
// ==========================================

function initDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButton();
    }
    
    elements.themeToggleBtn = document.getElementById('themeToggleBtn');
    if (elements.themeToggleBtn) {
        elements.themeToggleBtn.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// ==========================================
// ADVANCED FEATURES - TIPS CAROUSEL
// ==========================================

let currentTipIndex = 0;
const tips = [
    'Use Keywords: Include role-specific keywords from the job description',
    'Quantify Results: Use numbers and percentages to showcase achievements',
    'Keep it Clean: Use consistent formatting and avoid unusual fonts',
    'Add Metrics: Include impact metrics like "increased by 40%"',
    'Include Links: Add LinkedIn, GitHub, or portfolio URLs'
];

function initTipsCarousel() {
    const prevBtn = document.getElementById('tipsPrev');
    const nextBtn = document.getElementById('tipsNext');
    
    if (prevBtn) prevBtn.addEventListener('click', showPreviousTip);
    if (nextBtn) nextBtn.addEventListener('click', showNextTip);
}

function showNextTip() {
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    updateTipDisplay();
}

function showPreviousTip() {
    currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
    updateTipDisplay();
}

function updateTipDisplay() {
    const tipItems = document.querySelectorAll('.tip-item');
    tipItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentTipIndex);
    });
    
    const counter = document.getElementById('tipCounter');
    if (counter) counter.textContent = currentTipIndex + 1;
}

// ==========================================
// ADVANCED FEATURES - CHARACTER COUNTER
// ==========================================

function initCharCounter() {
    elements.fileInput.addEventListener('change', updateCharCount);
}

function updateCharCount() {
    if (currentResumeData.text) {
        const count = currentResumeData.text.length;
        const charCountElement = document.getElementById('charCount');
        if (charCountElement) {
            charCountElement.textContent = count.toLocaleString();
        }
    }
}

// ==========================================
// ADVANCED FEATURES - SCORE HISTORY
// ==========================================

let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];

function addToHistory(score, jobRole) {
    const historyEntry = {
        score,
        jobRole,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    scoreHistory.unshift(historyEntry);
    
    // Keep only last 10 entries
    if (scoreHistory.length > 10) {
        scoreHistory = scoreHistory.slice(0, 10);
    }
    
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
    displayScoreHistory();
}

function displayScoreHistory() {
    const historyCard = document.getElementById('historyCard');
    const historyList = document.getElementById('historyList');
    
    if (!historyCard || !historyList) return;
    
    if (scoreHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No history yet</p>';
        historyCard.style.display = 'none';
        return;
    }
    
    historyList.innerHTML = scoreHistory
        .map((entry, index) => `
            <div class="history-item">
                <div class="history-item-left">
                    <div class="history-role">${index + 1}. ${entry.jobRole}</div>
                    <div class="history-date">${entry.date} ${entry.time}</div>
                </div>
                <div class="history-score">${entry.score}/100</div>
            </div>
        `)
        .join('');
    
    historyCard.style.display = 'block';
}

// ==========================================
// ADVANCED FEATURES - PDF EXPORT
// ==========================================

function setupPDFExport() {
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadReportPDF);
        downloadPdfBtn.style.display = 'block';
    }
}

function downloadReportPDF() {
    const analysis = currentResumeData.analysis;
    const jobRole = currentResumeData.jobRole;
    
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; }
            .header { background: linear-gradient(135deg, #6366f1, #835cf6); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; }
            .score-box { background: #f0f4ff; padding: 20px; border-radius: 8px; text-align: center; }
            .score-value { font-size: 48px; font-weight: bold; color: #6366f1; }
            .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
            .tag { background: #e0e7ff; padding: 6px 12px; border-radius: 16px; font-size: 12px; }
            .tag-found { background: #d1fae5; color: #047857; }
            .tag-missing { background: #fee2e2; color: #991b1b; }
            .progress { background: #e2e8f0; height: 20px; border-radius: 10px; overflow: hidden; margin: 5px 0; }
            .progress-bar { background: linear-gradient(90deg, #6366f1, #835cf6); height: 100%; width: 80%; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>AI Resume Analyzer Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
            <h2>Job Role</h2>
            <p><strong>${jobRole}</strong></p>
        </div>
        
        <div class="score-box">
            <div class="score-value">${analysis.overallScore}</div>
            <p style="margin: 10px 0;">ATS Score out of 100</p>
            <h3 id="scoreTitle">${getScoreTitle(analysis.overallScore)}</h3>
        </div>
        
        <div class="section">
            <h2>Score Breakdown</h2>
            <p><strong>Keyword Match:</strong> ${analysis.keywordScore}%</p>
            <div class="progress"><div class="progress-bar" style="width: ${analysis.keywordScore}%;"></div></div>
            
            <p><strong>Formatting Quality:</strong> ${analysis.formattingScore}%</p>
            <div class="progress"><div class="progress-bar" style="width: ${analysis.formattingScore}%;"></div></div>
            
            <p><strong>Section Structure:</strong> ${analysis.structureScore}%</p>
            <div class="progress"><div class="progress-bar" style="width: ${analysis.structureScore}%;"></div></div>
            
            <p><strong>Length & Readability:</strong> ${analysis.lengthScore}%</p>
            <div class="progress"><div class="progress-bar" style="width: ${analysis.lengthScore}%;"></div></div>
        </div>
        
        <div class="section">
            <h2>Detected Skills (${analysis.detectedSkills.length})</h2>
            <div class="tags">
                ${analysis.detectedSkills.map(s => `<div class="tag tag-found">${s}</div>`).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>Missing Skills (${analysis.missingSkills.length})</h2>
            <div class="tags">
                ${analysis.missingSkills.map(s => `<div class="tag tag-missing">${s}</div>`).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>Keywords Found (${analysis.foundKeywords.length})</h2>
            <div class="tags">
                ${analysis.foundKeywords.map(k => `<div class="tag tag-found">${k}</div>`).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>Recommendations</h2>
            ${analysis.recommendations.map(r => `<p>• ${r.text}</p>`).join('')}
        </div>
        
        <div class="footer">
            <p>This report was generated by AI Resume Analyzer</p>
            <p>${new Date().toLocaleString()}</p>
        </div>
    </body>
    </html>
    `;
    
    const link = document.createElement('a');
    const blob = new Blob([htmlContent], { type: 'text/html' });
    link.href = URL.createObjectURL(blob);
    link.download = `resume_analysis_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
}

function getScoreTitle(score) {
    if (score >= 80) return 'Excellent ATS Compatibility';
    if (score >= 60) return 'Good ATS Compatibility';
    if (score >= 40) return 'Fair ATS Compatibility';
    return 'Needs Improvement';
}

// ==========================================
// UPDATE DISPLAY FUNCTIONS WITH COUNTS
// ==========================================

function displaySkillsWithCounts(detected, missing) {
    document.getElementById('detectedCount').textContent = detected.length;
    document.getElementById('missingCount').textContent = missing.length;
    
    if (detected.length > 0) {
        elements.detectedSkills.innerHTML = detected
            .map(skill => `<div class="tag tag-found">${skill}</div>`)
            .join('');
    }
    
    if (missing.length > 0) {
        elements.missingSkills.innerHTML = missing
            .map(skill => `<div class="tag tag-missing">${skill}</div>`)
            .join('');
    } else {
        elements.missingSkills.innerHTML = '<p class="empty-state">Great! You have all the key skills.</p>';
    }
    
    elements.skillsGrid.style.display = 'grid';
}

function displayKeywordAnalysisWithCounts(found, suggested) {
    document.getElementById('foundCount').textContent = found.length;
    document.getElementById('suggestedCount').textContent = suggested.length;
    
    if (found.length > 0) {
        elements.foundKeywords.innerHTML = found
            .map(kw => `<div class="tag tag-found">${kw}</div>`)
            .join('');
    }
    
    if (suggested.length > 0) {
        elements.suggestedKeywords.innerHTML = suggested
            .slice(0, 8)
            .map(kw => `<div class="tag tag-missing">${kw}</div>`)
            .join('');
    } else {
        elements.suggestedKeywords.innerHTML = '<p class="empty-state">All key keywords found!</p>';
    }
    
    elements.keywordsCard.style.display = 'block';
}

// ==========================================
// ENHANCED DISPLAY RESULTS
// ==========================================

function displayResultsEnhanced() {
    const analysis = currentResumeData.analysis;
    
    displayPreview();
    displayScore(analysis.overallScore);
    displaySkillsWithCounts(analysis.detectedSkills, analysis.missingSkills);
    displayATSBreakdown(analysis);
    displayRecommendations(analysis.recommendations);
    displayKeywordAnalysisWithCounts(analysis.foundKeywords, analysis.suggestedKeywords);
    displayScoreHistory();
    
    // Add to history
    addToHistory(analysis.overallScore, currentResumeData.jobRole);
    
    updateCharCount();
    elements.actionButtons.style.display = 'flex';
}

// ==========================================
// INITIALIZE ADVANCED FEATURES
// ==========================================

function initializeAdvancedFeatures() {
    initDarkMode();
    initTipsCarousel();
    initCharCounter();
    setupPDFExport();
    displayScoreHistory();
}

// Update main analyze function
const originalAnalyzeResume = analyzeResume;
async function analyzeResumeEnhanced() {
    currentResumeData.jobRole = elements.jobRole.value.trim();
    
    elements.loadingSpinner.style.display = 'block';
    hideAllResults();
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    currentResumeData.analysis = performAnalysis(
        currentResumeData.text,
        currentResumeData.jobRole
    );
    
    elements.loadingSpinner.style.display = 'none';
    displayResultsEnhanced();
}

// Override the analyze button handler
elements.analyzeBtn.removeEventListener('click', analyzeResume);
elements.analyzeBtn.addEventListener('click', analyzeResumeEnhanced);

// Initialize advanced features on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeAdvancedFeatures();
});
