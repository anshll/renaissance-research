export interface Paper {
    id: number,
    title: string,
    author: string,
    year: number,
    category: string,
    scores: {
      latent_novelty_potential: number,
      cross_disciplinary_applicability: number,
      technical_timeliness: number,
      obscurity_advantage: number,
      total: number
    },
    optimist_justification: string[],
    devils_advocate_justification: string[],
    synthesizer_justification: string[],
    takeaway: string,
}

export const papers: Paper[] = [
    {
      id: 0,
      title: "On the Electrodynamics of Moving Bodies",
      author: "Albert Einstein",
      year: 1905,
      category: "Computer Science",
      scores: {
        latent_novelty_potential: 10,
        cross_disciplinary_applicability: 10,
        technical_timeliness: 10,
        obscurity_advantage: 5,
        total: 35
      },
      optimist_justification: [
        "- <Direct excerpt from optimistic assessment capturing a key reason for potential>",
        "- <Another important excerpt showing actionable insight>",
        "... (2-4 bullets max)"
      ],
      devils_advocate_justification: [
        "- <Direct excerpt from optimistic assessment capturing a key reason for potential>",
        "- <Another important excerpt showing actionable insight>",
        "... (2-4 bullets max)"
      ],
      synthesizer_justification: [
        "- <Direct excerpt from optimistic assessment capturing a key reason for potential>",
        "- <Another important excerpt showing actionable insight>",
        "... (2-4 bullets max)"
      ],
      takeaway: "Consider",
    }
  ]