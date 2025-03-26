export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold mb-8">About.</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Hi there! I'm a passionate web developer with expertise in building modern, responsive, and user-friendly
            applications.
          </p>
          <p className="text-lg mb-4">
            With several years of experience in the field, I've worked on a variety of projects ranging from small
            business websites to complex web applications. I specialize in front-end development using React and
            Next.js, but I'm also comfortable working with back-end technologies.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
            enjoying outdoor activities.
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
                <li>HTML / CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tools</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Git / GitHub</li>
                <li>VS Code</li>
                <li>Figma</li>
                <li>Docker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Other</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>CI/CD</li>
                <li>Testing (Jest, Cypress)</li>
                <li>Responsive Design</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

