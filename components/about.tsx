export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold mb-8">About.</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Hi! I'm a Computer Science student currently studying at Multimedia University Cyberjaya. 
            I'm passionate about coding and building applications that are both functional and visually appealing.
          </p>
          <p className="text-lg mb-4">
            I’ve been learning and working on a variety of projects throughout my studies, focusing mostly on front-end web development. 
            While my main interest is in front-end, I also enjoy exploring back-end technologies and integrating them with my front-end work.
          </p>
          <p className="text-lg">
            Outside of coding, I love staying up-to-date with the latest technologies, working on personal projects, and improving myself, little by little, day by day.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Frontend</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML / CSS / JS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Node.js</li>
                <li>Express</li>
                <li>Supabase</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tools</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Git / GitHub</li>
                <li>VS Code</li>
                <li>Figma</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Other</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Flask</li>
                <li>Java</li>
                <li>C++</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
