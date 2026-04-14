export type EmailType =
  // Attended April 12 → nurture to May 8 course (send ~every 5 days)
  | "attended-1-welcome"
  | "attended-2-science"
  | "attended-3-transformation"
  | "attended-4-social-proof"
  | "attended-5-final-push"
  // Missed April 12 → nudge to April 19 intro talk
  | "missed-1-invite"
  | "missed-2-three-day"
  | "missed-3-day-before"
  | "missed-4-day-of"
  // Never attended any intro talk → cold nurture to May 8 course
  | "cold-1-what-is-it"
  | "cold-2-science"
  | "cold-3-course-details"
  | "cold-4-stories"
  | "cold-5-urgency"
  | "cold-6-final"
  // Ongoing nurture (any list, evergreen)
  | "nurture-evergreen-1"
  | "nurture-evergreen-2"

const NEXT_INTRO_DATE = "Sunday 19 April 2026"
const NEXT_INTRO_TIME = "7:00 PM BST"
const NEXT_INTRO_MEET = "https://meet.google.com/dua-kxwc-ers"
const COURSE_PAGE_URL = "https://art-of-living-devon.vercel.app/art-of-living-part-1"

const courseBlock = `
  <div style="background: #fff7ed; border-left: 3px solid #f97316; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
    <p style="font-weight: 600; margin: 0 0 12px 0; font-size: 15px;">Upcoming Part 1 Course dates:</p>
    <p style="margin: 0 0 2px 0;"><strong>May 8, 9 &amp; 10, 2026</strong> &bull; St Sidwell's Community Centre, Exeter</p>
    <p style="margin: 0 0 14px 0; font-size: 14px;">
      <a href="${COURSE_PAGE_URL}" style="color: #f97316; font-weight: 600;">Find out more and register for May &rarr;</a>
    </p>
    <p style="margin: 0 0 2px 0;"><strong>September 25, 26 &amp; 27, 2026</strong> &bull; St Sidwell's Community Centre, Exeter</p>
    <p style="margin: 0; font-size: 14px;">
      <a href="${COURSE_PAGE_URL}" style="color: #f97316; font-weight: 600;">Find out more and register for September &rarr;</a>
    </p>
  </div>
`

const nextIntroBlock = `
  <div style="background: #fff7ed; border-left: 3px solid #f97316; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
    <p style="font-weight: 600; margin: 0 0 8px 0; font-size: 15px;">Next Free Intro Talk</p>
    <p style="margin: 0 0 4px 0;"><strong>${NEXT_INTRO_DATE}</strong> at ${NEXT_INTRO_TIME}</p>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: #555;">Online via Google Meet &bull; 60 minutes &bull; Free</p>
    <a href="${NEXT_INTRO_MEET}" style="display: inline-block; background: #f97316; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Join Google Meet &rarr;</a>
  </div>
`

const wrapper = (body: string) => `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.75;">
  ${body}
  <div style="border-top: 1px solid #eee; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #aaa; text-align: center;">
    Art of Living Devon &amp; Southwest &bull;
    <a href="${COURSE_PAGE_URL}" style="color: #f97316; text-decoration: none;">View course page</a>
  </div>
</body>
</html>`

export function getEmailContent(
  type: EmailType,
  firstName: string
): { subject: string; htmlContent: string } {

  // ─── ATTENDED SEQUENCE ──────────────────────────────────────────────────────

  if (type === "attended-1-welcome") {
    return {
      subject: "Thank you for joining - here is your next step",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>It was great having you at the intro talk. I hope you left with a real sense of what is possible.</p>
        <p>The <strong>Part 1 Course</strong> is where the full transformation begins. Over three days you will learn the complete SKY Breath technique, experience guided meditations, and leave with a daily practice you can carry for life.</p>
        <p>The course covers:</p>
        <ul style="padding-left: 20px; line-height: 2;">
          <li><strong>Sudarshan Kriya (SKY Breath)</strong> - the signature technique, clinically researched</li>
          <li><strong>Pranayama</strong> - ancient breathing practices to energise and calm the nervous system</li>
          <li><strong>Yoga and Meditation</strong> - no prior experience needed</li>
          <li><strong>Wisdom for Daily Life</strong> - practical tools for relationships and emotions</li>
        </ul>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "Within three days I started experiencing a deep shift from anxiousness to peace, from sadness to joy."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Glenn-Douglas Haig, CEO</span>
        </blockquote>
        ${courseBlock}
        <p>The May batch is filling up. If you have questions before registering, just reply to this email.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "attended-2-science") {
    return {
      subject: "The science behind what you experienced",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>If you are curious about the science behind what you felt at the intro talk, here is what the research shows.</p>
        <p>SKY Breath Meditation has been studied at Yale, Harvard, Stanford, and in over 100 peer-reviewed studies. The results are consistent:</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">60%</span>
            <span style="font-size: 14px; color: #555;">reduction in the stress hormone cortisol within 3 months</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">37%</span>
            <span style="font-size: 14px; color: #555;">increase in calm within 4 weeks</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">34%</span>
            <span style="font-size: 14px; color: #555;">reduction in depression within 4 weeks</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">31%</span>
            <span style="font-size: 14px; color: #555;">reduction in insomnia</span>
          </div>
        </div>
        <p>The reason it works is that SKY uses specific breath rhythms to directly regulate the autonomic nervous system. It is not relaxation through effort - it is a physiological reset.</p>
        <p>The intro talk gave you a glimpse. The Part 1 Course is where you learn the full technique and make it yours.</p>
        ${courseBlock}
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "attended-3-transformation") {
    return {
      subject: "What life actually looks like after the course",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>People often come to the Part 1 Course looking for stress relief. What they leave with tends to surprise them.</p>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "I used to be so tense. I would get so angry, shouting, screaming. Now when I realise I am getting tense, I just breathe and I calm down. I am much more focused and much more productive."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Mawahib Shaibani, Financial Advisor</span>
        </blockquote>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "After 90 days, I felt my stress was markedly reduced. Now I would not stop doing it because I would not want to revert to the levels of stress I had at the time."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Dr. Joe Rod, Cardiologist</span>
        </blockquote>
        <p>The technique takes about 20 minutes a day. Most people notice a shift within the first week of daily practice.</p>
        <p>The May course is the next opportunity to learn it properly, with a certified instructor:</p>
        ${courseBlock}
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "attended-4-social-proof") {
    return {
      subject: "800 million people can't be wrong",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>SKY Breath Meditation has been taught to over 800 million people across 180 countries over 44 years. It is one of the most widely practised breathing techniques in the world.</p>
        <p>It has been featured in Forbes, the Wall Street Journal, the BBC, and recommended by doctors, therapists, and executives.</p>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "I have been looking for this for 15 years. The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Charlotte Puls, Lawyer</span>
        </blockquote>
        <p>The May course in Exeter is one of the few opportunities to learn this in person locally. Spots are limited.</p>
        ${courseBlock}
        <p>You can also <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about what the course involves here</a>.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "attended-5-final-push") {
    return {
      subject: "Course starts in 2 days - last chance to join",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>The May Part 1 Course starts this Friday and I wanted to reach out one last time in case you have been on the fence.</p>
        <p>Three days. A technique you will use every day for the rest of your life. Taught in person by a certified instructor in Exeter.</p>
        <p>If not May, the next available date is September - which is a long time to wait if you are ready now.</p>
        ${courseBlock}
        <p>If you have any questions before registering, reply to this email right now. Happy to help.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  // ─── MISSED SEQUENCE → APRIL 19 ─────────────────────────────────────────────

  if (type === "missed-1-invite") {
    return {
      subject: "Missed the intro talk? There is another one on 19 April",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>We missed you at the intro talk last Sunday! No worries at all.</p>
        <p>There is another free session happening on <strong>${NEXT_INTRO_DATE} at ${NEXT_INTRO_TIME}</strong>. It is the same relaxed, no-commitment hour where you get to experience a breathing exercise and see what SKY Breath Meditation is all about.</p>
        <p>No preparation needed. Just show up.</p>
        ${nextIntroBlock}
        <p>Hope to see you there.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "missed-2-three-day") {
    return {
      subject: "3 days to go - free intro talk this Sunday",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>Just a heads up that the free intro talk is coming up <strong>this Sunday, 19 April at 7:00 PM BST</strong>.</p>
        <p>It is 60 minutes online. You will experience a guided breathing exercise, a short meditation, and have the chance to ask questions live. No pressure to participate - just come and see.</p>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I had not experienced that in a long time."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Phillip Mertz, Investment Manager</span>
        </blockquote>
        ${nextIntroBlock}
        <p>See you Sunday,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "missed-3-day-before") {
    return {
      subject: "Tomorrow at 7 PM - free intro talk",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>Just a reminder that the free intro talk is <strong>tomorrow, Sunday 19 April at 7:00 PM BST</strong>.</p>
        <p>It runs for 60 minutes online and covers:</p>
        <ul style="padding-left: 20px; line-height: 2;">
          <li>A live breathwork experience you can feel working immediately</li>
          <li>A short guided meditation</li>
          <li>An introduction to SKY Breath Meditation and the Part 1 Course</li>
          <li>Live Q&amp;A with the instructor</li>
        </ul>
        ${nextIntroBlock}
        <p>See you tomorrow,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "missed-4-day-of") {
    return {
      subject: "Tonight at 7 PM - the intro talk is on",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>Just a quick note that the free intro talk is <strong>tonight at 7:00 PM BST</strong>. It is not too late to join.</p>
        <p>Click below to open Google Meet a couple of minutes before 7 PM. Camera on is fine but no pressure to participate.</p>
        ${nextIntroBlock}
        <p>See you tonight,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  // ─── COLD SEQUENCE (never attended any session) ─────────────────────────────

  if (type === "cold-1-what-is-it") {
    return {
      subject: "What is SKY Breath Meditation?",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>You signed up to find out more about SKY Breath Meditation. Here is a quick introduction.</p>
        <p>SKY (Sudarshan Kriya Yoga) is a specific sequence of breathing techniques developed by Sri Sri Ravi Shankar in 1982. Unlike general relaxation or mindfulness, it uses precise rhythms of breath to directly regulate the nervous system.</p>
        <p>In practical terms, people who practice it regularly report:</p>
        <ul style="padding-left: 20px; line-height: 2;">
          <li>Falling asleep faster and waking up with more energy</li>
          <li>Feeling calmer under pressure without trying to suppress anything</li>
          <li>A general improvement in mood that does not depend on circumstances</li>
          <li>Better focus and less mental chatter</li>
        </ul>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I had not experienced that in a long time."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Phillip Mertz, Investment Manager</span>
        </blockquote>
        <p>It has been taught to over 800 million people across 180 countries. The Art of Living Part 1 Course is where you learn the full technique over three days.</p>
        <p>I will share more over the next few emails. In the meantime, you can <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about the course here</a>.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "cold-2-science") {
    return {
      subject: "Why breathing changes everything (the research)",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>A lot of wellness practices ask you to take their benefits on faith. SKY Breath Meditation is one of the few that has been independently studied across more than 100 peer-reviewed papers.</p>
        <p>Researchers at Yale, Harvard, and Stanford have all looked at it. Here is what they consistently find:</p>
        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">60%</span>
            <span style="font-size: 14px; color: #555;">reduction in the stress hormone cortisol within 3 months</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">37%</span>
            <span style="font-size: 14px; color: #555;">increase in calm within 4 weeks</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline; margin-bottom: 10px;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">34%</span>
            <span style="font-size: 14px; color: #555;">reduction in depression within 4 weeks</span>
          </div>
          <div style="display: flex; gap: 12px; align-items: baseline;">
            <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">31%</span>
            <span style="font-size: 14px; color: #555;">reduction in insomnia</span>
          </div>
        </div>
        <p>The reason the results are so consistent is that SKY does not work through willpower or belief. The breath directly regulates the autonomic nervous system - the part of your body that controls your baseline stress level. You cannot think your way to a lower cortisol level, but you can breathe your way there.</p>
        <p>The Part 1 Course is where you learn how. More on that in the next email.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "cold-3-course-details") {
    return {
      subject: "What actually happens over the 3 days",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>The Art of Living Part 1 Course runs over three sessions. Here is exactly what you learn:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; width: 24px;">
              <span style="color: #f97316; font-size: 16px;">&#9670;</span>
            </td>
            <td style="padding: 12px 0 12px 12px; border-bottom: 1px solid #f0f0f0;">
              <strong>Sudarshan Kriya (SKY Breath)</strong><br>
              <span style="font-size: 14px; color: #555;">The core technique. A specific rhythm of breath that clears accumulated stress and restores the nervous system. Clinically researched. Takes about 20 minutes a day once you know it.</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
              <span style="color: #f97316; font-size: 16px;">&#9670;</span>
            </td>
            <td style="padding: 12px 0 12px 12px; border-bottom: 1px solid #f0f0f0;">
              <strong>Pranayama</strong><br>
              <span style="font-size: 14px; color: #555;">Ancient yogic breathing exercises including Bhastrika, Ujjayi, and Nadi Shodhana. Used to energise, calm, or balance the nervous system depending on what you need.</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
              <span style="color: #f97316; font-size: 16px;">&#9670;</span>
            </td>
            <td style="padding: 12px 0 12px 12px; border-bottom: 1px solid #f0f0f0;">
              <strong>Yoga and Meditation</strong><br>
              <span style="font-size: 14px; color: #555;">Gentle sequences and guided meditation. No prior yoga experience needed. The focus is on stillness and recovery, not exercise.</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; vertical-align: top;">
              <span style="color: #f97316; font-size: 16px;">&#9670;</span>
            </td>
            <td style="padding: 12px 0 12px 12px;">
              <strong>Wisdom for Daily Life</strong><br>
              <span style="font-size: 14px; color: #555;">Practical tools for handling stress, relationships, and emotions. Interactive sessions, not lectures.</span>
            </td>
          </tr>
        </table>
        <p>No prior experience needed for any of it. The course is taught by Susie Bedford, a certified Art of Living instructor, at St Sidwell's Community Centre in Exeter.</p>
        ${courseBlock}
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "cold-4-stories") {
    return {
      subject: "From a sceptical cardiologist to a CEO - real stories",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>I want to share a few stories from people who have done the Part 1 Course. These are not hand-picked outliers - this kind of result is what the research consistently shows too.</p>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "After 90 days of doing this, I felt my stress was markedly reduced. Now I would not stop doing it because I would not want to revert to the levels of stress I had at the time."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Dr. Joe Rod, Cardiologist</span>
        </blockquote>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "Within three days I started experiencing a deep shift from anxiousness to peace, from sadness to joy. I find myself more and more centred in the joy and clarity of a calm and peaceful existence."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Glenn-Douglas Haig, CEO</span>
        </blockquote>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "I have been looking for this for 15 years. The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Charlotte Puls, Lawyer</span>
        </blockquote>
        <p>The May course in Exeter is coming up. If any of this resonates, now is a good time to secure your spot.</p>
        ${courseBlock}
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "cold-5-urgency") {
    return {
      subject: "The May course is filling up",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>The May Part 1 Course at St Sidwell's Community Centre in Exeter is filling up and I wanted to flag it in case you have been thinking about joining.</p>
        <p>To recap what you get over three days:</p>
        <ul style="padding-left: 20px; line-height: 2;">
          <li>The full SKY Breath technique - a daily 20-minute practice that is yours for life</li>
          <li>Pranayama, yoga, and guided meditation</li>
          <li>Practical tools for stress, focus, and emotional resilience</li>
          <li>Taught in person by a certified instructor</li>
        </ul>
        <p>Backed by 100+ peer-reviewed studies. Practised by 800 million people globally.</p>
        ${courseBlock}
        <p>If you have any questions before registering, reply to this email. Happy to help.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "cold-6-final") {
    return {
      subject: "Last chance - course starts this Friday",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>The May Part 1 Course starts this Friday, 8 May, and I wanted to reach out one final time.</p>
        <p>If you have been sitting on the fence, here is the honest pitch: three days of your time in exchange for a daily practice that has helped millions of people reduce stress, sleep better, and feel more like themselves.</p>
        <p>If not May, the next date is September - a long wait if you are ready now.</p>
        ${courseBlock}
        <p>If you have any questions right now, reply to this email and I will get back to you quickly.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  // ─── EVERGREEN NURTURE ───────────────────────────────────────────────────────

  if (type === "nurture-evergreen-1") {
    return {
      subject: "What happens when you breathe properly for 21 days",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>Most people go their entire lives breathing at about 20% capacity. Shallow, fast, unconscious breathing that keeps the nervous system in a low-level stress state.</p>
        <p>SKY Breath Meditation uses specific rhythms of breath to reset the nervous system from the inside, reducing cortisol, improving sleep, and creating a baseline calm that does not depend on your circumstances.</p>
        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I had not experienced that in a long time."
          <br><span style="font-style: normal; font-size: 13px; color: #888;">Phillip Mertz, Investment Manager</span>
        </blockquote>
        ${courseBlock}
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  // nurture-evergreen-2
  return {
    subject: "The May batch is almost full",
    htmlContent: wrapper(`
      <p>Hi ${firstName},</p>
      <p>Just a quick note that the May course is filling up and I do not want you to miss it if you have been thinking about joining.</p>
      <p>Three days. A technique you will use for the rest of your life. Backed by research, taught by a certified instructor in Exeter.</p>
      <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
        "I have been looking for this for 15 years. The techniques are truly a gift."
        <br><span style="font-style: normal; font-size: 13px; color: #888;">Charlotte Puls, Lawyer</span>
      </blockquote>
      ${courseBlock}
      <p>Happy to answer anything before you register. Just hit reply.</p>
      <p>Warm regards,<br>The Art of Living Devon Team</p>
    `),
  }
}

// Labels grouped for the admin UI
export const EMAIL_GROUPS: Array<{
  label: string
  description: string
  types: EmailType[]
}> = [
  {
    label: "Attended April 12 - Course Nurture",
    description: "Send one every ~5 days leading up to May 8",
    types: [
      "attended-1-welcome",
      "attended-2-science",
      "attended-3-transformation",
      "attended-4-social-proof",
      "attended-5-final-push",
    ],
  },
  {
    label: "Missed April 12 - Lead to April 19",
    description: "Send in sequence over the next 5 days",
    types: [
      "missed-1-invite",
      "missed-2-three-day",
      "missed-3-day-before",
      "missed-4-day-of",
    ],
  },
  {
    label: "Never Attended Any Session - Cold Nurture",
    description: "Registered but missed both Apr 12 and Apr 19 - send ~every 4-5 days",
    types: [
      "cold-1-what-is-it",
      "cold-2-science",
      "cold-3-course-details",
      "cold-4-stories",
      "cold-5-urgency",
      "cold-6-final",
    ],
  },
  {
    label: "Evergreen Nurture",
    description: "Use any time for warm contacts",
    types: ["nurture-evergreen-1", "nurture-evergreen-2"],
  },
]

export const EMAIL_TYPE_LABELS: Record<EmailType, string> = {
  "attended-1-welcome":       "1. Welcome + course intro (send now)",
  "attended-2-science":       "2. The science behind it (send Apr 16)",
  "attended-3-transformation":"3. Transformation stories (send Apr 22)",
  "attended-4-social-proof":  "4. 800M people (send Apr 29)",
  "attended-5-final-push":    "5. Course starts in 2 days (send May 6)",
  "missed-1-invite":          "1. Missed you - join Apr 19 (send now)",
  "missed-2-three-day":       "2. 3 days to go (send Apr 16)",
  "missed-3-day-before":      "3. Tomorrow at 7 PM (send Apr 18)",
  "missed-4-day-of":          "4. Tonight at 7 PM (send Apr 19)",
  "cold-1-what-is-it":        "1. What is SKY Breath Meditation? (send now)",
  "cold-2-science":           "2. Why breathing changes everything (send day 5)",
  "cold-3-course-details":    "3. What happens over the 3 days (send day 10)",
  "cold-4-stories":           "4. Real stories from real people (send day 15)",
  "cold-5-urgency":           "5. The May course is filling up (send day 20)",
  "cold-6-final":             "6. Last chance - course starts Friday (send May 6)",
  "nurture-evergreen-1":      "Evergreen: Breathing for 21 days",
  "nurture-evergreen-2":      "Evergreen: May batch almost full",
}
