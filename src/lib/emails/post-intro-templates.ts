export type EmailType = "attended" | "missed" | "nurture-1" | "nurture-2" | "nurture-3"

const COURSE_PAGE_URL = "https://artoflivingdevon.com/art-of-living-part-1"

const courseBlock = `
  <div style="background: #fff7ed; border-left: 3px solid #f97316; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
    <p style="font-weight: 600; margin: 0 0 12px 0; font-size: 15px;">Upcoming Part 1 Course dates:</p>
    <p style="margin: 0 0 2px 0;"><strong>May 8, 9 &amp; 10, 2026</strong></p>
    <p style="margin: 0 0 14px 0; font-size: 14px;">
      <a href="https://aolreg.org/c/GBC1012472" style="color: #f97316; font-weight: 600;">Register for May</a>
    </p>
    <p style="margin: 0 0 2px 0;"><strong>September 25, 26 &amp; 27, 2026</strong></p>
    <p style="margin: 0; font-size: 14px;">
      <a href="https://aolreg.org/c/GBC1044098" style="color: #f97316; font-weight: 600;">Register for September</a>
    </p>
    <p style="margin: 14px 0 0 0; font-size: 13px; color: #92400e;">
      3 sessions &times; 3 hours each &bull; Online &bull; Certified instructors
    </p>
  </div>
`

const whatYouLearnBlock = `
  <div style="margin: 20px 0;">
    <p style="font-weight: 600; margin: 0 0 12px 0;">What you will learn over 3 days:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; width: 28px;">
          <span style="color: #f97316; font-size: 18px;">&#9670;</span>
        </td>
        <td style="padding: 10px 0 10px 10px; border-bottom: 1px solid #f0f0f0;">
          <strong>Sudarshan Kriya (SKY Breath)</strong><br>
          <span style="font-size: 14px; color: #555;">The signature technique. A clinically researched rhythm of breath that releases stress at the cellular level.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
          <span style="color: #f97316; font-size: 18px;">&#9670;</span>
        </td>
        <td style="padding: 10px 0 10px 10px; border-bottom: 1px solid #f0f0f0;">
          <strong>Pranayama (Breathing Exercises)</strong><br>
          <span style="font-size: 14px; color: #555;">Ancient yogic breathing practices including Bhastrika, Ujjayi, and Nadi Shodhana to energise and calm the nervous system.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
          <span style="color: #f97316; font-size: 18px;">&#9670;</span>
        </td>
        <td style="padding: 10px 0 10px 10px; border-bottom: 1px solid #f0f0f0;">
          <strong>Yoga &amp; Meditation</strong><br>
          <span style="font-size: 14px; color: #555;">Gentle sequences and guided meditation to quiet the mind and re-energise the body. No prior experience needed.</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; vertical-align: top;">
          <span style="color: #f97316; font-size: 18px;">&#9670;</span>
        </td>
        <td style="padding: 10px 0 10px 10px;">
          <strong>Wisdom for Daily Life</strong><br>
          <span style="font-size: 14px; color: #555;">Practical tools for handling relationships, emotions, and everyday challenges with more ease.</span>
        </td>
      </tr>
    </table>
  </div>
`

const statsBlock = `
  <div style="background: #f9f9f9; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
    <p style="font-weight: 600; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #777;">Backed by 100+ peer-reviewed studies</p>
    <div style="display: grid; gap: 8px;">
      <div style="display: flex; gap: 12px; align-items: baseline;">
        <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">60%</span>
        <span style="font-size: 14px; color: #555;">reduction in stress hormone cortisol within 3 months</span>
      </div>
      <div style="display: flex; gap: 12px; align-items: baseline;">
        <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">37%</span>
        <span style="font-size: 14px; color: #555;">increase in calm within 4 weeks</span>
      </div>
      <div style="display: flex; gap: 12px; align-items: baseline;">
        <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">31%</span>
        <span style="font-size: 14px; color: #555;">reduction in insomnia</span>
      </div>
      <div style="display: flex; gap: 12px; align-items: baseline;">
        <span style="color: #f97316; font-size: 20px; font-weight: 700; min-width: 48px;">34%</span>
        <span style="font-size: 14px; color: #555;">reduction in depression within 4 weeks</span>
      </div>
    </div>
  </div>
`

const wrapper = (body: string) => `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.75;">
  ${body}
  <div style="border-top: 1px solid #eee; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #aaa; text-align: center;">
    Art of Living Devon &amp; Southwest &bull;
    <a href="${COURSE_PAGE_URL}" style="color: #f97316; text-decoration: none;">View the full course page</a>
  </div>
</body>
</html>`

export function getEmailContent(
  type: EmailType,
  firstName: string
): { subject: string; htmlContent: string } {

  if (type === "attended") {
    return {
      subject: "Thank you for joining - here is your next step",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>It was great having you at the intro talk. I hope you got a real feel for what SKY Breath Meditation can do and left with a sense of what is possible.</p>
        <p>The <strong>Part 1 Course</strong> is where the full transformation begins. Over three days you will learn the complete SKY Breath technique, experience guided meditations, and leave with a daily practice you can carry for life.</p>

        ${whatYouLearnBlock}

        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "Within three days I started experiencing a deep shift within myself from anxiousness to peace, from sadness to joy. I find myself more and more centered in the joy and clarity of a calm and peaceful existence."
          <br><br>
          <span style="font-style: normal; font-size: 13px; color: #888;">Glenn-Douglas Haig, CEO</span>
        </blockquote>

        ${courseBlock}

        <p>The May batch is filling up, so if that date works for you I would recommend securing your spot soon. You can also <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about the course here</a> before registering.</p>
        <p>If you have any questions, just reply to this email. Happy to help.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "missed") {
    return {
      subject: "Sorry we missed you - here is what is next",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>We missed you at the intro talk! Life gets busy, I completely understand.</p>
        <p>There will be another free intro session coming up and I would love for you to join. It is a relaxed, no-commitment hour where you get a real sense of what SKY Breath Meditation is about.</p>
        <p>In the meantime, here is a little more about what the <strong>Part 1 Course</strong> actually involves:</p>

        ${whatYouLearnBlock}

        ${statsBlock}

        <p>And here are the upcoming course dates when you are ready:</p>

        ${courseBlock}

        <p>I will be in touch with the next intro talk date soon. Or if you already know you would like to join, you can <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about the course here</a>.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "nurture-1") {
    return {
      subject: "What happens when you breathe properly for 21 days",
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>Most people go their entire lives breathing at about 20% capacity. Shallow, fast, unconscious breathing that keeps the nervous system in a low-level stress state.</p>
        <p>SKY Breath Meditation works differently. It uses specific rhythms of breath to reset the nervous system from the inside, reducing cortisol, improving sleep, and creating a baseline calm that does not depend on your circumstances.</p>

        ${statsBlock}

        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I had not experienced that in a long time."
          <br><br>
          <span style="font-style: normal; font-size: 13px; color: #888;">Phillip Mertz, Investment Manager</span>
        </blockquote>

        <p>Thousands of people have called it the most impactful thing they have done for their mental health. If you have been on the fence, the next batch is coming up:</p>

        ${courseBlock}

        <p>You can also <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about the course here</a>. Reply with any questions.</p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  if (type === "nurture-2") {
    return {
      subject: `"I didn't think breathing could change anything"`,
      htmlContent: wrapper(`
        <p>Hi ${firstName},</p>
        <p>That is what a lot of people say before the course. And it is fair. It sounds almost too simple.</p>
        <p>But here is what the research shows: SKY Breath Meditation has been studied at Yale, Harvard, and Stanford. It consistently reduces anxiety, improves sleep quality, and increases energy, not through willpower or mindset shifts, but through direct physiological change.</p>

        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "I used to be so tense. I would be getting so angry, shouting, screaming. Now when I realize I am getting tense, I just breathe and I calm down. I am much more focused and much more productive."
          <br><br>
          <span style="font-style: normal; font-size: 13px; color: #888;">Mawahib Shaibani, Financial Advisor</span>
        </blockquote>

        <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
          "After 90 days of doing this, I felt my stress was markedly reduced. Now I would not stop doing it because I would not want to revert to the levels of stress I had at the time."
          <br><br>
          <span style="font-style: normal; font-size: 13px; color: #888;">Dr. Joe Rod, Cardiologist</span>
        </blockquote>

        <p>If you have been curious but not quite ready, that is okay. But when you are, here is where to go:</p>

        ${courseBlock}

        <p><a href="${COURSE_PAGE_URL}" style="color: #f97316;">See the full course page here.</a></p>
        <p>Warm regards,<br>The Art of Living Devon Team</p>
      `),
    }
  }

  // nurture-3
  return {
    subject: "The May batch is almost full",
    htmlContent: wrapper(`
      <p>Hi ${firstName},</p>
      <p>Just a quick note that the May course is filling up and I do not want you to miss it if you have been thinking about joining.</p>
      <p>Here is a reminder of what the three days include:</p>

      ${whatYouLearnBlock}

      <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
        "I have been looking for this for 15 years! The techniques are truly a gift. When I practice them regularly, I feel great no matter what has happened during the day."
        <br><br>
        <span style="font-style: normal; font-size: 13px; color: #888;">Charlotte Puls, Lawyer</span>
      </blockquote>

      ${courseBlock}

      <p>Happy to answer anything before you register. Just hit reply. Or <a href="${COURSE_PAGE_URL}" style="color: #f97316;">read more about the course here.</a></p>
      <p>Warm regards,<br>The Art of Living Devon Team</p>
    `),
  }
}

export const EMAIL_TYPE_LABELS: Record<EmailType, string> = {
  attended: "Attended Follow-up",
  missed: "Missed Follow-up",
  "nurture-1": "Nurture 1: Breathing for 21 days",
  "nurture-2": "Nurture 2: I didn't think breathing could change anything",
  "nurture-3": "Nurture 3: May batch is almost full",
}
