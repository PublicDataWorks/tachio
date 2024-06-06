interface Conversation {
  labels: Label[]
}

interface Label {
  id: string;
}

declare class MissiveClass {
  on(event: string, callback: (ids: string[]) => void): void

  async fetchConversations(ids: string[]): Promise<Conversation[]>;
}

declare const Missive: InstanceType<typeof MissiveClass>
