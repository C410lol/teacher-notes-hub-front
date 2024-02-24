export class DialogParent {

    isMode01: boolean = false;
    isMode02: boolean = false;
    isMode03: boolean = false;
    isMode04: boolean = false;

    isStatusMode: boolean = false;
    statusType: string = '';
    statusTitle: string = '';
    statusContent: string = '';

    switchMode01(): void {
        this.isMode01 = !this.isMode01;
    }

    switchMode02(): void {
        this.isMode02 = !this.isMode02;
    }

    switchMode03(): void {
        this.isMode03 = !this.isMode03;
    }

    switchMode04(): void {
        this.isMode04 = !this.isMode04;
    }

    switchStatusMode(): void {
        this.isStatusMode = true;
        setTimeout(() => this.isStatusMode = false, 3000);
    }

    setStatusModeFalse(): void {
        this.isStatusMode = false;
    }

    setStatus(title?: string, content?: string, status?: string): void {
        if (title != null) this.statusTitle = title;
        if (content != null) this.statusContent = content;
        if (status != null) this.statusType = status;
    }

}