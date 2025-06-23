export function analyzeEmail(content) {
  // This is a mock analysis - in a real app you'd call an API or use more sophisticated detection
  const issues = []
  let score = 100 // Start with perfect score
  
  // Check for urgency
  if (/(urgent|immediate|action required)/i.test(content)) {
    issues.push({
      title: "Urgency detected",
      description: "The email creates a sense of urgency, which is a common phishing tactic.",
      severity: "medium"
    })
    score -= 20
  }
  
  // Check for suspicious links
  const linkMatches = content.match(/https?:\/\/[^\s]+/g) || []
  const suspiciousLinks = linkMatches.filter(link => 
    !link.includes('trusteddomain.com') && 
    (link.includes('login') || link.includes('verify') || link.includes('secure'))
  )
  
  if (suspiciousLinks.length > 0) {
    issues.push({
      title: "Suspicious links found",
      description: `The email contains links that may be phishing attempts: ${suspiciousLinks.join(', ')}`,
      severity: "high"
    })
    score -= 30
  }
  
  // Check for poor grammar
  const grammarErrors = content.split(/[.!?]/).filter(sentence => 
    sentence.split(' ').length > 5 && 
    (sentence.match(/[A-Z][a-z]* [A-Z][a-z]*/) || sentence.match(/\b\w{15,}\b/))
  ).length
  
  if (grammarErrors > 2) {
    issues.push({
      title: "Poor grammar detected",
      description: "The email contains multiple grammar mistakes, which is common in phishing emails.",
      severity: "low"
    })
    score -= 10
  }
  
  // Check for requests for personal info
  if (/(password|account|social security|credit card)/i.test(content)) {
    issues.push({
      title: "Personal information requested",
      description: "The email asks for personal information, which legitimate organizations typically don't do via email.",
      severity: "high"
    })
    score -= 25
  }
  
  // Ensure score doesn't go below 0
  score = Math.max(0, score)
  
  return {
    score,
    issues,
    recommendation: score < 50 
      ? "This email appears to be safe, but always verify unexpected emails with the sender." 
      : score < 80 
        ? "Be cautious with this email. It shows several signs of being suspicious." 
        : "Do not interact with this email. It's highly likely to be a phishing attempt."
  }
}

export function analyzeLink(url) {
  // This is a mock analysis - in a real app you'd call an API or use more sophisticated detection
  const issues = []
  let score = 100 // Start with perfect score
  
  // Check for HTTPS
  if (!url.startsWith('https://')) {
    issues.push({
      title: "No HTTPS",
      description: "The link doesn't use HTTPS, which means your connection isn't encrypted.",
      severity: "medium"
    })
    score -= 15
  }
  
  // Check for suspicious domains
  const domain = url.match(/https?:\/\/([^/]+)/)?.[1] || ''
  const suspiciousDomains = ['free-gifts', 'account-verify', 'login-secure', 'paypal-secure']
  
  if (suspiciousDomains.some(d => domain.includes(d))) {
    issues.push({
      title: "Suspicious domain",
      description: "The domain name looks suspicious and may be impersonating a legitimate service.",
      severity: "high"
    })
    score -= 30
  }
  
  // Check for recently registered domains (mock)
  const domainAge = Math.random() * 365 // Random age in days
  if (domainAge < 30) {
    issues.push({
      title: "Newly registered domain",
      description: `This domain was registered very recently (${Math.floor(domainAge)} days ago), which is common with phishing sites.`,
      severity: "medium"
    })
    score -= 20
  }
  
  // Check for IP addresses in URL
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
    issues.push({
      title: "IP address in URL",
      description: "The link uses an IP address instead of a domain name, which is unusual for legitimate sites.",
      severity: "high"
    })
    score -= 25
  }
  
  // Ensure score doesn't go below 0
  score = Math.max(0, score)
  
  return {
    score,
    issues,
    recommendation: score < 50 
      ? "This link appears to be safe, but always be cautious when visiting unfamiliar websites." 
      : score < 80 
        ? "Be very careful with this link. It shows several suspicious characteristics." 
        : "Do not visit this link. It's highly likely to be dangerous."
  }
}