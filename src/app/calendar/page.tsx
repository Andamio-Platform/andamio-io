export default async function CalendarPage() {
  return (
    <main className="items-center justify-center" style={{ minHeight: "calc(100vh - 5rem)" }}>
      <div className="card bg-primary text-primary-content font-mono shadow-xl md:mx-5 md:mt-5 z-10 p-5">
        <h1 className="py-10 text-4xl">Andamio Public Calendar</h1>
        <div className="">
          <section className="realtive">
            <iframe
              src="https://teamup.com/ksso1wk6ysj9ireqau?title=Gimbalabs%20Calendar&showLogo=0&showSearch=0&showProfileAndInfo=0&showSidepanel=1&disableSidepanel=1&showTitle=0&showViewSelector=1&showMenu=0&showAgendaHeader=1&showAgendaDetails=0&showYearViewHeader=1"
              width="100%"
              height="800px"
            ></iframe>
          </section>
        </div>
      </div>
    </main>
  );
}

// https://teamup.com/ksso1wk6ysj9ireqau