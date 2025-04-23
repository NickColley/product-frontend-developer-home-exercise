interface LatestParty {
  name: string;
}

interface LatestHouseMembership {
  membershipFrom: string,
  membershipEndDate: Date
}

interface Member {
  latestParty: LatestParty,
  nameDisplayAs: string,
  thumbnailUrl: string,
  latestHouseMembership: LatestHouseMembership,
}

class Main {
  constructor() {
    this.init();
  }

  async init () {
    // In a real application I would do this logic on the server and 
    // render using a traditional templating language

    const id = this.getQueryParam("id");
    if (!id) {
      return;
    }
    const member = await this.getMemberData(id);
    const $memberCard = this.createMemberCardFromTemplate(member);

    document.querySelector("main").prepend($memberCard);
  }

  getQueryParam(name: string) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  async getMemberData (id: string) {
    const response = await fetch(`https://members-api.parliament.uk/api/Members/${id}`);
    const { value: member } = await response.json();
    return member;
  }

  createMemberCardFromTemplate (member: Member) {
    const $template = document.querySelector("template");
    const $memberCard = <Element>$template.content.cloneNode(true);
    const partyName = member.latestParty.name;
    $memberCard.querySelector(".members-card").classList.add(`members-card--${partyName.toLowerCase()}`);
    $memberCard.querySelector(".members-card__avatar").setAttribute("src", member.thumbnailUrl);
    $memberCard.querySelector(".members-card__name").textContent = member.nameDisplayAs;
    $memberCard.querySelector(".members-card__party").textContent = partyName;
    $memberCard.querySelector(".members-card__constituency").textContent = member.latestHouseMembership.membershipFrom;
    const isServing = !!member.latestHouseMembership.membershipEndDate;
    if (!isServing) {
      $memberCard.querySelector(".members-card__body").removeChild(
        $memberCard.querySelector(".members-card__info")
      );
    }
    return $memberCard;
  }
}

new Main();
