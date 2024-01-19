const BardGeneratedTicketDetailsSidebar = ({ ticket }: { ticket: any | null }) => {
  if (ticket)
    return (
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-1/3 min-h-full bg-base-200 text-base-content">
          <div className="flex flex-col mt-24 w-full p-3 gap-3">
            <h2 className="text-3xl font-bold">{ticket.summary}</h2>
            <p>{ticket.description}</p>

            <hr className="border" />

            <h3 className="text-lg font-bold">Acceptance Criteria</h3>
            {ticket.acceptanceCriteria.length ? (
              ticket.acceptanceCriteria.map((item: string, id: number) => {
                return (
                  <ul key={id}>
                    <li>{item}</li>
                  </ul>
                );
              })
            ) : (
              <p>No acceptance criteria to show!</p>
            )}

            <h3 className="text-lg font-bold">Test Scenarios</h3>
            {ticket.testScenarios.length ? (
              ticket.testScenarios.map((item: string, id: number) => {
                return (
                  <ul key={id}>
                    <li>{item}</li>
                  </ul>
                );
              })
            ) : (
              <p>No test scenarios to show!</p>
            )}

            <h3 className="text-lg font-bold">Impact Analysis</h3>
            {ticket.impactAnalysis.length ? (
              ticket.impactAnalysis.map((item: string, id: number) => {
                return (
                  <ul key={id}>
                    <li>{item}</li>
                  </ul>
                );
              })
            ) : (
              <p>No impact analysis for this user story!</p>
            )}
          </div>
        </ul>
      </div>
    );
};

export default BardGeneratedTicketDetailsSidebar;
