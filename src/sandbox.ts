const form = document.getElementById("form") as HTMLFormElement;
const userName = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const password2 = document.getElementById("password2") as HTMLInputElement;
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const showSuccessOrErrorMessage = (item: HTMLElement, messageType: "success" | "error", message?: string) => {
	const formControl = item.parentElement as HTMLDivElement;
	formControl.className = messageType === "error" ? "form-control error" : "form-control success";
	if (messageType === "error" && !!message) {
		const small = formControl.querySelector("small")!;
		small.innerHTML = message;
	}
};

function checkEmail(email: HTMLInputElement) {
	if (re.test(email.value.toLowerCase())) {
		showSuccessOrErrorMessage(email, "success");
	} else {
		showSuccessOrErrorMessage(email, "error", "Not a valid email");
	}
}

const checkRequired = (items: HTMLInputElement[]) => {
	items.forEach((item: HTMLInputElement) => {
		if (item.value.trim() === "") {
			showSuccessOrErrorMessage(item, "error", captializedNameOFInput(item) + " is required");
		} else {
			showSuccessOrErrorMessage(item, "success");
		}
	});
};

const checkLength = (item: HTMLInputElement, miniumLength: number) => {
	if (item.value.length >= miniumLength) {
		showSuccessOrErrorMessage(item, "success");
	} else {
		showSuccessOrErrorMessage(item, "error", `minimum ${miniumLength} charcter is required`);
	}
};

const captializedNameOFInput = (item: HTMLInputElement): string => {
	return item.id[0].toUpperCase() + item.id.slice(1);
};

const checkPasswordMatch = (password: HTMLInputElement, password2: HTMLInputElement) => {
	if (password.value === password2.value) {
		showSuccessOrErrorMessage(password2, "success");
	} else {
		showSuccessOrErrorMessage(password2, "error", `the passwords doesn't match`);
	}
};

form.addEventListener("submit", function (e: Event) {
	e.preventDefault();
	checkRequired([userName, email, password, password2]);
	checkEmail(email);
	checkLength(password, 6);
	checkLength(password2, 6);
	checkPasswordMatch(password, password2);
});
