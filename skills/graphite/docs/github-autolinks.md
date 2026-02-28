> ## Documentation Index
> Fetch the complete documentation index at: https://graphite-58cc94ce.mintlify.dev/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub Autolinks

> Learn how to configure GitHub autolinks to automatically reference external resources like issue trackers in your pull requests on Graphite.

## What are GitHub Autolinks?

GitHub autolinks allow you to automatically convert text references in pull requests, issues, commit messages, and release descriptions into clickable links to external resources. This feature is particularly useful for connecting your code changes to external project management tools, issue trackers, or documentation.

When properly configured, typing a reference like `JIRA-123` or `TICKET-456` in your pull request description or comments will automatically create a hyperlink to the corresponding resource in your external system.

## How Autolinks Work on Graphite

Graphite fully supports GitHub's autolinks feature. Any autolinks you configure in your GitHub repository settings will automatically work in:

* Pull request titles and descriptions
* Pull request comments and reviews
* Commit messages
* Stack descriptions

Since Graphite maintains 2-way sync with GitHub, autolinks configured through GitHub will be rendered correctly in the Graphite interface, making it easy to navigate to related tickets, issues, or documentation while reviewing code.

## Configuration

Autolinks must be configured through your GitHub repository settings. Once configured, they will work automatically in both GitHub and Graphite.

### Prerequisites

* Repository admin permissions
* GitHub Pro, GitHub Team, GitHub Enterprise Cloud, or GitHub Enterprise Server

### Configuring Autolinks on GitHub

To set up autolinks for your repository:

1. Navigate to your repository on GitHub
2. Click **Settings** in the repository menu
3. In the left sidebar, click **Autolinks** under the "Integrations" section
4. Click **Add autolink reference**
5. Configure your autolink:
   * **Reference prefix**: A short identifier that will trigger the autolink (e.g., `JIRA-`, `TICKET-`, `DOC-`)
   * **Target URL**: The URL template with `<num>` as a placeholder for the identifier (e.g., `https://your-jira.atlassian.net/browse/JIRA-<num>`)
   * **Format**: Choose between alphanumeric or numeric identifiers
6. Click **Add autolink reference** to save

For detailed instructions, see [GitHub's official documentation on configuring autolinks](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/configuring-autolinks-to-reference-external-resources).

## Common Use Cases

### Issue Tracking Systems

Link to your project management and issue tracking tools:

**Jira**

* Prefix: `JIRA-`
* URL: `https://your-company.atlassian.net/browse/JIRA-<num>`
* Example: `JIRA-123` → Links to Jira ticket JIRA-123

**Linear**

* Prefix: `LIN-`
* URL: `https://linear.app/your-team/issue/LIN-<num>`
* Example: `LIN-456` → Links to Linear issue LIN-456

**Zendesk**

* Prefix: `TICKET-`
* URL: `https://your-company.zendesk.com/agent/tickets/<num>`
* Example: `TICKET-789` → Links to Zendesk ticket #789

### Documentation Systems

Connect to internal documentation:

**Confluence**

* Prefix: `CONF-`
* URL: `https://your-company.atlassian.net/wiki/pages/viewpage.action?pageId=<num>`
* Example: `CONF-100` → Links to Confluence page

**Notion**

* Prefix: `NOTION-`
* URL: `https://notion.so/your-workspace/<num>`
* Example: `NOTION-abc123` → Links to Notion page

### Design Systems

Link to design mockups and specifications:

**Figma**

* Prefix: `FIG-`
* URL: `https://www.figma.com/file/your-file-id/?node-id=<num>`
* Example: `FIG-250` → Links to Figma design

## Best Practices

### Choose Clear Prefixes

Use prefixes that clearly indicate the external system:

* Make them short but descriptive (2-5 characters + hyphen)
* Use uppercase for consistency
* Include a hyphen at the end (e.g., `JIRA-` not `JIRA`)

### Avoid Prefix Conflicts

GitHub doesn't allow overlapping prefixes. For example, you cannot configure both `TICK` and `TICKET` as prefixes, as `TICK` would match first.

### Document Your Autolinks

Consider documenting your team's autolink conventions in:

* Your repository's README
* Pull request templates
* Team onboarding documentation

This helps team members know which references are available and how to use them effectively.

### Use in PR Descriptions

Include relevant autolink references in your PR descriptions to provide context:

```markdown  theme={null}
## Summary
This PR implements the new authentication flow requested in JIRA-1234.

## Related Issues
- JIRA-1234: Add OAuth2 support
- DOC-567: Authentication architecture guide
- FIG-890: Login flow mockups
```

When viewing this PR in Graphite, all these references will be clickable links to the external resources.

## Limitations

* **Admin permissions required**: Only repository administrators can configure autolinks
* **No overlapping prefixes**: Reference prefixes cannot overlap with each other
* **Case sensitivity**: Autolinks are case-sensitive by default
* **Configuration location**: Autolinks must be configured through GitHub settings (not configurable directly in Graphite)
* **Alphanumeric support**: While GitHub supports both numeric and alphanumeric identifiers, some older systems may only support numeric references

## Troubleshooting

### Autolinks Not Working

If your autolinks aren't rendering correctly:

1. **Verify configuration**: Check that the autolink is properly configured in your GitHub repository settings
2. **Check permissions**: Ensure you have admin access to configure autolinks
3. **Verify prefix**: Confirm you're using the exact prefix including any hyphens or special characters
4. **Check plan**: Autolinks require GitHub Pro or higher
5. **Clear cache**: Try refreshing the page or clearing your browser cache

### Links Not Opening Correctly

If autolinks are rendering but pointing to the wrong location:

1. **Verify URL template**: Double-check that your target URL includes `<num>` as the placeholder
2. **Test the URL**: Manually construct a URL with a test identifier to verify it works
3. **Check identifier format**: Ensure you've selected the correct format (numeric vs. alphanumeric)
