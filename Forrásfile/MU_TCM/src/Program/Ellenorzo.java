package Program;
import javax.swing.JOptionPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class Ellenorzo {
	
	public boolean filled(JTextField a, String an) {
		String s = RTF(a);
		if(s.length() > 0) {
			return true;
		}
		else {
			SM("Hiba a(z): "+an+" mezõ üres!", 0);
			return false;
		}
	}
	
	public boolean filled(JTextField a) {
		String s = RTF(a);
		if(s.length() > 0) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public boolean filled(JTextArea a) {
		String s = RTA(a);
		if(s.length() > 0) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public boolean goodInt(JTextField a, String an) {
		String s = RTF(a);
		boolean b = filled(a, an);
		if(b) {
			try {
				Integer.parseInt(s);
			}catch(NumberFormatException e) {
				SM("A(z) "+an+" mezõben hibás a számadat!", 0);
				b = false;
			}
		}
		return b;
	}
	
	public int stringToInt (String s) {
		int x = -1;
		try {
			x = Integer.valueOf(s);
		}catch(NumberFormatException nfe) {
			SM("stringToInt: "+nfe.getMessage(), 0);
		}
		return x;
	}
	
	public String RTF(JTextField jtf) {
		return jtf.getText();
	}
	
	public String RTA(JTextArea jta) {
		return jta.getText();
	}
	
	public void SM(String msg, int tipus) {
		JOptionPane.showMessageDialog(null, msg, "Program üzenet", tipus);
	}
}
