# Recreate config file

if (Test-Path ./env-config.js) {
	Remove-Item -Force ./env-config.js
}

echo "window._env_ = {" >> ./env-config.js

Get-Content ./.env | ForEach-Object {
	$name = $_.substring(0, $_.IndexOf('='))
	$value = [System.Environment]::GetEnvironmentVariable($name,'machine')

	if ($value.length -eq 0) {
		$entry_to_add = $name + ": """+ $_.substring($name.length+1) + ""","
	} else {
		$entry_to_add = $name + ": """+ $value + ""","
	}

	echo $entry_to_add >> ./env-config.js
}

echo "}" >> ./env-config.js
